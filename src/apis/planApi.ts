import axiosInstance from './axiosInstance.ts';
import { FilteredPlanPayload, Plan, UpdatePlanRequest, UpdatePlanResponse } from '../types/plan.ts';

const getPlanList = async (): Promise<{ data: Plan[] }> => {
  const response = await axiosInstance.get<{ data: Plan[] }>('/planList');
  return response.data;
};

const getPlanDetail = async (planId: number) => {
  const response = await axiosInstance.get(`/planDetail/${planId}`);
  return response.data;
};

// 요금제 필터링 요청
const getFilteredPlans = async (filteredPlan: FilteredPlanPayload) => {
  const response = await axiosInstance.post('/filterPlans', filteredPlan);

  return response.data;
};

// 요금제 변경 요청
const updatePlan = async (planData: UpdatePlanRequest): Promise<UpdatePlanResponse> => {
  // 1. CSRF 토큰 요청
  const csrf = await axiosInstance.get('/csrf-token');
  const csrfToken = csrf.data.csrfToken;

  // 2. CSRF 토큰을 포함하여 요금제 변경 요청
  const response = await axiosInstance.post<UpdatePlanResponse>('/changeUserPlan', planData, {
    headers: {
      'X-CSRF-Token': csrfToken,
    },
    withCredentials: true,
  });

  return response.data;
};

const getRecommendedPlans = async (birthday: string) => {
  const csrf = await axiosInstance.get('/csrf-token');
  const csrfToken = csrf.data.csrfToken;

  const response = await axiosInstance.post<Plan[]>(
    '/recommendPlansByAge',
    { birthday },
    {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export { getPlanList, getPlanDetail, getFilteredPlans, updatePlan, getRecommendedPlans };
