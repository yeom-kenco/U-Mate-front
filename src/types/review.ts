export interface Review {
  REVIEW_ID: number;
  USER_ID: number;
  PLAN_ID: number;
  STAR_RATING: number;
  REVIEW_CONTENT: string;
  CREATED_AT: string;
  UPDATED_AT: string;
}

export interface CreateReviewRequest {
  userId: number;
  planId: number;
  rating: number;
  review: string;
}

export interface UpdateReviewRequest {
  reviewId: number;
  rating: number;
  review: string;
}

export interface DeleteReviewRequest {
  reviewId: number;
}
