import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // cambia esto si lo desplegás
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
