// src/api/auth.js
import axiosInst from './axiosInst.ts';
// 회원가입 & 로그인

import {
  ChangeProps,
  CodeCheck,
  EmailpasswordCheckProps,
  LoginProps,
  SignUpRequest,
} from '../types/member';
import axios from 'axios';

export const signUp = (data: SignUpRequest) => axiosInst.post('/signUp', data);

export const login = (data: LoginProps) => axiosInst.post('/login', data);
export const logout = (data: string) => axiosInst.post('/logout', { email: data });

// 이메일 인증
export const sendEmailCode = (data: { email: string }) => axiosInst.post('/email', data);
export const verifyEmailCode = (data: CodeCheck) => axiosInst.post('/checkAuth', data);

// 비밀번호 관리
export const changePassword = (data: ChangeProps) => axiosInst.post('/passwordChange', data);
export const resetPassword = (data: EmailpasswordCheckProps) =>
  axiosInst.post('/passwordReset', data);
export const checkPassword = async (data: EmailpasswordCheckProps) => {
  // 1. CSRF 토큰 먼저 요청
  const csrf = await axiosInst.get('/csrf-token');
  const csrfToken = csrf.data.csrfToken;

  // 2. 비밀번호 확인 요청 (CSRF 포함)
  return axiosInst.post('/passwordCheck', data, {
    headers: {
      'X-CSRF-TOKEN': csrfToken,
    },
    withCredentials: true, // 쿠키 포함 필수
  });
};

// 계정 관리
export const checkPhoneDuplicate = (data: { email: string }) =>
  axiosInst.post('/duplicateCheck', data);
export const findEmailByPhone = (data: string) => axiosInst.post('/phoneNumberCheck', data);
export const getUserInfo = (data: EmailpasswordCheckProps) => axiosInst.post('/userInfo', data); // 서버는 '/getUserInfo'인데 명세대로면 '/userInfo'임
export const deleteAccount = (data: EmailpasswordCheckProps) => axiosInst.post('/withDrawal', data);
export const validateToken = async () => {
  // 1. CSRF 토큰을 먼저 가져옴
  const csrf = await axiosInst.get('/csrf-token');
  const csrfToken = csrf.data.csrfToken;

  // 2. CSRF 토큰을 포함하여 토큰 유효성 검사 요청
  const response = await axiosInst.get('/tokenCheck', {
    headers: {
      'X-CSRF-TOKEN': csrfToken,
    },
    withCredentials: true,
  });

  return response;
};

export const checkEmailDuplicate = (data: string) => axiosInst.post('/emailDuplicate', data);
