import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // change if your backend runs on another port
});

// Add this interceptor to include token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
