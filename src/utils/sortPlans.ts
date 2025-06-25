import { Plan } from '../apis/PlansApi';

export const sortPlans = (plans: Plan[], criteria: string): Plan[] => {
  switch (criteria) {
    case '높은 가격순':
      return [...plans].sort((a, b) => b.MONTHLY_FEE - a.MONTHLY_FEE);
    case '낮은 가격순':
      return [...plans].sort((a, b) => a.MONTHLY_FEE - b.MONTHLY_FEE);
    case '리뷰 많은 순':
      return [...plans].sort((a, b) => b.REVIEW_USER_COUNT - a.REVIEW_USER_COUNT);
    default:
      return [...plans].sort((a, b) => {
        const scoreA = a.REVIEW_USER_COUNT === 0 ? 0 : a.RECEIVED_STAR_COUNT / a.REVIEW_USER_COUNT;
        const scoreB = b.REVIEW_USER_COUNT === 0 ? 0 : b.RECEIVED_STAR_COUNT / b.REVIEW_USER_COUNT;

        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        } else {
          return b.REVIEW_USER_COUNT - a.REVIEW_USER_COUNT;
        }
      });
  }
};
