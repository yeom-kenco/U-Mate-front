import axios from 'axios';

const axiosInst = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  withCredentials: true, // 쿠키 포함 필수
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 전 인터셉터: CSRF 토큰 자동 부착
axiosInst.interceptors.request.use(async (config) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/csrf-token`, {
      credentials: 'include',
    });
    const { csrfToken } = await res.json();

    config.headers['X-CSRF-Token'] = csrfToken;
  } catch (error) {
    console.warn('CSRF 토큰 요청 실패:', error);
  }
  return config;
});

export default axiosInst;
