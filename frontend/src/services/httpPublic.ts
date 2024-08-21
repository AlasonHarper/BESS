import axios from 'axios';

const httpPublic = axios.create({
  baseURL: 'http://95.216.224.99:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpPublic;
