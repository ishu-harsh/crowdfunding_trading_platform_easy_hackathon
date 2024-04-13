import axios from 'axios';
import SetCookie from '../util/Cookies';

const options = {
  method: 'GET',
  url: 'https://binance43.p.rapidapi.com/ticker/24hr'
};

const LoginService = async (body) => {

  try {
    if (body === null) {
        throw new Error("Request body cannot be null");
    }

    const response = await axios.request({ ...options, data: body });

    // Assuming the response should contain JWT and be stored inside a cookie
    console.log(response.data.token);

    // Store JWT inside a cookie here
    SetCookie(response.data.token);

    return true;
  } catch (err) {
    console.error(err);
    alert("Login Failed. Please try again.");
    
  }
  return false;
};

export default LoginService;
