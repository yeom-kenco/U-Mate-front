import axiosInstance from './axiosInstance.ts';

// 요금제 리스트 요청
export const getPlanList = async () => {
  const response = await axiosInstance.get(`/planList`);
  return response.data;
};
