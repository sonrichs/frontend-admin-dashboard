import axios from 'axios';
import { config } from './config';

const AxiosInstance = axios.create({
  baseURL: config.backend.baseURL, // Set your base URL here or override per request
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // Example: Attach auth token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle global errors
    // if (error.response?.status === 401) {
    //   // Redirect to login or show message
    // }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
