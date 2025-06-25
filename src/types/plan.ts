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
