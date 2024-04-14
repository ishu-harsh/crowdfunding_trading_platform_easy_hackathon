import axios from 'axios';
import SetCookie from '../util/Cookies';

const customAxios = axios.create({
  baseURL: 'http://localhost:5500', // Use baseURL instead of url
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' // No need for comma here
    // Add any additional headers you need
  }
});

const LoginService = async (body) => {
  try {
    if (!body) {
      throw new Error("Request body cannot be null");
    }

    console.log(body);

    const response = await customAxios.post('/login', body); // Use customAxios for making requests

    // Assuming the response should contain JWT and be stored inside a cookie
    console.log(response.data.token);

    // Store JWT inside a cookie here
    SetCookie(response.data.token);

    return true;
  } catch (err) {
    console.error(err);
    alert("Login Failed. Please try again.");
    return false;
  }
};

export default LoginService;
