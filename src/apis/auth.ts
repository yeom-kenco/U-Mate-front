// src/api/auth.js
import axiosInstance from './axiosInst.ts';

// 회원가입 & 로그인
import { CodeCheck, LoginProps, ResetProps, SignUpRequest } from '../types/member';

export const signUp = (data: SignUpRequest) => axiosInstance.post('/signUp', data);

export const login = (data: LoginProps) => axiosInstance.post('/login', data);
export const logout = (data) => axiosInstance.post('/logout', data);

// 이메일 인증
export const sendEmailCode = (data: string) => axiosInstance.post('/email', data);
export const verifyEmailCode = (data: CodeCheck) => axiosInstance.post('/checkAuth', data);

// 비밀번호 관리
export const changePassword = (data: ResetProps) => axiosInstance.post('/passwordChange', data);
export const resetPassword = (data) => axiosInstance.post('/passwordReset', data);
export const checkPassword = (data) => axiosInstance.post('/passwordCheck', data);

// 계정 관리
export const checkPhoneDuplicate = (data: string) => axiosInstance.post('/duplicateCheck', data);
export const findEmailByPhone = (data: string) => axiosInstance.post('/phoneNumberCheck', data);
export const getUserInfo = (data) => axiosInstance.post('/userInfo', data); // 서버는 '/getUserInfo'인데 명세대로면 '/userInfo'임
export const deleteAccount = (data) => axiosInstance.post('/withDrawal', data);
export const validateToken = () => axiosInstance.get('/tokenCheck');

