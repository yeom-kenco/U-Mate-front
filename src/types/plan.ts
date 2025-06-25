export interface PlanListItem {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  DATA_INFO: string;
  DATA_INFO_DETAIL: string;
  RECEIVED_STAR_COUNT: number;
  REVIEW_USER_COUNT: number;
}

export interface Benefit {
  BENEFIT_ID: number;
  NAME: string;
  TYPE: string;
}

export interface Review {
  REVIEW_ID: number;
  USER_ID: number;
  STAR_RATING: number;
  REVIEW_CONTENT: string;
}

export interface PlanDetailResponse {
  success: boolean;
  message: string;
  data: {
    plan: PlanListItem;
    benefits: Benefit[];
    reviews: Review[];
  };
}

export interface Plan {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  CALL_INFO: string;
  CALL_INFO_DETAIL: string;
  DATA_INFO: string;
  DATA_INFO_DETAIL: string;
  SHARE_DATA: string;
  SMS_INFO: string;
  USER_COUNT: number;
  RECEIVED_STAR_COUNT: string;
  REVIEW_USER_COUNT: number;
  AGE_GROUP: string;
}

export interface PlanDetail extends Plan {
  benefits: Benefit[];
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
