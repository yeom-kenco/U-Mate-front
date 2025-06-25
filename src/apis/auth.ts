// src/api/auth.js
import axiosInst from './axiosInst.ts';
// 회원가입 & 로그인

import {
  CodeCheck,
  LoginProps,
  ResetProps,
  SignUpRequest,
  passwordCheckProps,
} from '../types/member';

export const signUp = (data: SignUpRequest) => axiosInst.post('/signUp', data);

export const login = (data: LoginProps) => axiosInst.post('/login', data);
export const logout = (data) => axiosInst.post('/logout', data);

// 이메일 인증
export const sendEmailCode = (data: string) => axiosInst.post('/email', data);
export const verifyEmailCode = (data: CodeCheck) => axiosInst.post('/checkAuth', data);

// 비밀번호 관리

export const changePassword = (data: ResetProps) => axiosInst.post('/passwordChange', data);
export const resetPassword = (data) => axiosInst.post('/passwordReset', data);
export const checkPassword = (data: passwordCheckProps) => axiosInst.post('/passwordCheck', data);

// 계정 관리
export const checkPhoneDuplicate = (data: string) => axiosInst.post('/duplicateCheck', data);
export const findEmailByPhone = (data: string) => axiosInst.post('/phoneNumberCheck', data);
export const getUserInfo = (data) => axiosInst.post('/userInfo', data); // 서버는 '/getUserInfo'인데 명세대로면 '/userInfo'임
export const deleteAccount = (data) => axiosInst.post('/withDrawal', data);
export const validateToken = () => axiosInst.get('/tokenCheck');
export const checkEmailDuplicate = (data: string) => axiosInst.post('/emailDuplicate', data);
