import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

export default axiosInstance;
