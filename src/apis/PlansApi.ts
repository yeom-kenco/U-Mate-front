import axiosInstance from './axiosInstance.ts';

export interface Plan {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  AGE_GROUP: string;
  DATA_INFO: string;
  SHARE_DATA: string;
  RECEIVED_STAR_COUNT: number;
  REVIEW_USER_COUNT: number;
}

export interface PlanFilterRequest {
  ageGroup?: string;
  minFee?: number;
  maxFee?: number;
  dataType?: string;
  benefitIds?: string; // "1,2,3" 형식
}

export interface UpdatePlanRequest {
  userId: number;
  newPlanId: number;
}

export interface UpdatePlanResponse {
  success: boolean;
  message: string;
}

// 요금제 리스트 요청
export const getPlanList = async (): Promise<{ data: Plan[] }> => {
  const response = await axiosInstance.get<{ data: Plan[] }>('/planList');
  return response.data;
};

// 요금제 변경 요청
export const updatePlan = async (planData: UpdatePlanRequest): Promise<UpdatePlanResponse> => {
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

  console.log('변경 요청 성공');
  return response.data;
};

// 요금제 필터링 요청
export const getFilteredPlans = async (filteredPlan: PlanFilterRequest) => {
  const response = await axiosInstance.post('/filterPlans', filteredPlan);
  console.log('필터링 요청 성공', filteredPlan);
  return response.data;
};

export const getPlanDetail = async (planId: number) => {
  try {
    const response = await axiosInstance.get(`/planDetail/${planId}`);
    return response.data;
  } catch (error) {
    console.error('요금제 상세 정보 조회 실패:', error);
    throw error;
  }
};
