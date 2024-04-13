const dotenv = require('dotenv');
dotenv.config();  // Load environment variables

const port = process.env.PORT || 3000;  // Define the port




const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, addUser } = require('./models/Users');
const { register, login } = require('./routes/user'); // Adjust path as necessary

const app = express();

app.use(express.json());  // Middleware for parsing JSON

// Using handlers for routes
app.post('/register', register);
app.post('/login', login);





app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});