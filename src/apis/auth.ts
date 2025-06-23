// src/api/auth.js
import axios from './axios.ts';
// 회원가입 & 로그인
import { CodeCheck, SignUpRequest, SignUpResponse } from '../types/member';

export const signUp = (data: SignUpRequest): Promise<{ data: SignUpResponse }> => {
  return axios.post('/signUp', data);
};

export const login = (data) => axios.post('/login', data);
export const logout = (data) => axios.post('/logout', data);

// 이메일 인증
export const sendEmailCode = (data: string) => axios.post('/email', data);
export const verifyEmailCode = (data: CodeCheck) => axios.post('/checkAuth', data);

// 비밀번호 관리
export const changePassword = (data) => axios.post('/passwordChange', data);
export const resetPassword = (data) => axios.post('/passwordReset', data);
export const checkPassword = (data) => axios.post('/passwordCheck', data);

// 계정 관리
export const checkPhoneDuplicate = (data: string) => axios.post('/duplicateCheck', data);
export const findEmailByPhone = (data) => axios.post('/phoneNumberCheck', data);
export const getUserInfo = (data) => axios.post('/userInfo', data); // 서버는 '/getUserInfo'인데 명세대로면 '/userInfo'임
export const deleteAccount = (data) => axios.post('/withDrawal', data);
export const validateToken = () => axios.get('/tokenCheck');
