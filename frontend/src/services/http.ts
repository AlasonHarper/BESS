import axios from 'axios';
const http = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
