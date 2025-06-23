// src/store/userSlice.ts

// 대표페이지 만들면서 필요한 로그인한 유저 정보 관리 Redux 상태 예시로 휘뚜루마뚜루 작성한 파일입니다!
// 로그인 구현 담당하게 되실 분께서 편하게 수정해주십쇼!
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  birthDay: string; // 예: "1990-01-01T00:00:00.000Z"
  email: string;
  plan: number;
  membership: string | null; // "vvip", "vip", "우수", or null
}

const initialState: UserState = {
  id: 0,
  name: '',
  birthDay: '',
  email: '',
  plan: 0,
  membership: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
