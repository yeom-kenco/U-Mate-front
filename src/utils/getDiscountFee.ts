export const calculateDiscountedPrice = (monthlyFee: number, planName: string): number => {
  const baseDiscount = monthlyFee * 0.75;
  const isPremier = planName.includes('프리미어');
  const extraDiscount = isPremier ? 5250 : 0;
  return Math.max(0, baseDiscount - extraDiscount).toLocaleString();
};
