import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com/users',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
