const dotenv = require('dotenv');
dotenv.config();  // Load environment variables

const port = process.env.PORT || 5000;  // Define the port

const axios = require('axios');

const cors = require('cors'); // Import cors middleware

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, addUser } = require('./models/Users');
const { register, login } = require('./routes/user'); // Adjust path as necessary
const { buyShares } = require('./routes/contracts'); // Adjust path as necessary

const app = express();

app.use(express.json());  // Middleware for parsing JSON
app.use(cors());
app.options('*', cors());

// Using handlers for routes
app.post('/register', register);
app.post('/login', login);
app.post('/buyShares', buyShares);

const { POLYGON_API_KEY, COINAPI_KEY, OPEN_EXCHANGE_RATES_KEY } = process.env;

app.get('/stock-price/:symbol', async (req, res) => {
  try {
      // Fetch current stock price from Polygon.io
      const polygonResponse = await axios.get(`https://api.polygon.io/v2/last/nbbo/${req.params.symbol}?apiKey=${POLYGON_API_KEY}`);
      const priceUSD = polygonResponse.data.results.price; // Adjust according to the actual response structure
console.log(polygonResponse)
      // Fetch currency rates from Open Exchange Rates
      // const ratesResponse = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_RATES_KEY}`);
      // const rateGBP = ratesResponse.data.rates.GBP;

      // Convert USD to GBP
      // const priceGBP = (priceUSD * rateGBP).toFixed(2);

      // Fetch XRP rate from CoinAPI using the correct header for API key
      // const xrpResponse = await axios.get(`https://rest.coinapi.io/v1/exchangerate/USD/XRP`, {
      //     headers: {'X-CoinAPI-Key': COINAPI_KEY}
      // });
      // const xrpRate = xrpResponse.data.rate;

      // Convert USD to XRP
      // const priceXRP = (priceUSD * xrpRate).toFixed(2);

      // Send the response
      res.json({
          // company: req.params.symbol,
          priceUSD,
          // priceGBP,
          // priceXRP
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching stock price data');
  }
});






app.listen(5500, () => {
  console.log(`Server running on http://localhost:${5500}`);
});