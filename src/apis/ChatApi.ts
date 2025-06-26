import axiosInstance from './axiosInstance';

export const resetHistory = ({ email }: { email: string }) => {
  return axiosInstance.post('/resetHistory', { email });
};
