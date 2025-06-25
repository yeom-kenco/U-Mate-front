import axios, { AxiosInstance } from 'axios';

const axiosInst: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답에서 CSRF 토큰 추출하여 저장
let csrfToken: string | null = null;

axiosInst.interceptors.response.use((response) => {
  if (response.config.url?.includes('/csrf-token') && response.data?.csrfToken) {
    csrfToken = response.data.csrfToken;
  }
  return response;
});

// 요청 시 CSRF 토큰 자동 추가
axiosInst.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});

export default axiosInst;
