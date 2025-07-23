// import axios from 'axios';
// const API = axios.create({
//     baseURL: 'http//127.0.0.1:8000/api',    //It needs to be end with api
// });
// export default API;

// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default API;

