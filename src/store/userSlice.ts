import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  birthDay: string; // 예: "1990-01-01T00:00:00.000Z"
  email: string;
  plan: number;
  membership: string | null; // "vvip", "vip", "우수", or null
  isLogin?: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  birthDay: '',
  email: '',
  plan: 0,
  membership: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => initialState,
    updateUserPlan(state, action: PayloadAction<number>) {
      state.plan = action.payload;
//     setUser: (state, action) => {
//       Object.assign(state, action.payload);
//       state.isLogin = true;
//     },
//     clearUser: (state) => {
//       Object.assign(state, initialState);
//       state.isLogin = false;
    },
  },
});

export const { setUser, clearUser, updateUserPlan } = userSlice.actions;
export default userSlice.reducer;
