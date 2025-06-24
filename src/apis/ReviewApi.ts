import axiosInst from './axiosInst.ts';
import {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  DeleteReviewRequest,
} from '../types/review';

// 리뷰 조회
export const getMyReviews = async (
  userId: number
): Promise<{ success: boolean; message: string; reviews: Review[] }> => {
  const res = await axiosInst.get(`/myReview/${userId}`);
  return res.data;
};

// 리뷰 작성
export const createReview = async (
  data: CreateReviewRequest
): Promise<{ success: boolean; message: string }> => {
  const res = await axiosInst.post('/createReview', data);
  return res.data;
};

// 리뷰 수정
export const updateReview = async (
  data: UpdateReviewRequest
): Promise<{ success: boolean; message: string }> => {
  const res = await axiosInst.post('/updateReview', data);
  return res.data;
};

// 리뷰 삭제
export const deleteReview = async (
  data: DeleteReviewRequest
): Promise<{ success: boolean; message: string }> => {
  const res = await axiosInst.post('/deleteReview', data);
  return res.data;
};
