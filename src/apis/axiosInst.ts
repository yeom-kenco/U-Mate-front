import axios, { AxiosInstance } from 'axios';

const axiosInst: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInst;
