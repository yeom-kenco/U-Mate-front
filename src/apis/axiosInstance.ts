import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true, // 쿠키 포함 필수
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
