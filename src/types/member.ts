// types/member.ts
export interface SignUpRequest {
  name: string;
  gender: 'M' | 'F'; // 남자 | 여자
  birthDay: string; // YYYY-MM-DD 형식
  phoneNumber: string;
  email: string;
  password: string;
  phonePlan: number; // 사용/관심 요금제
}

export interface CodeCheck {
  email: string;
  auth: string;
}

export interface SignUpSuccess {
  success?: true;
  message: string;
}

export interface SignUpError {
  success?: false;
  message?: string;
  error?: string;
}

export type SignUpResponse = SignUpSuccess | SignUpError;
