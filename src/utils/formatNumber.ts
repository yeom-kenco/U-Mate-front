/**
 * 숫자를 3자리마다 콤마로 구분하여 포맷팅합니다.
 * @param number - 포맷팅할 숫자
 * @returns 콤마로 구분된 문자열
 */
export const formatNumber = (number: number | string): string => {
  if (number === null || number === undefined) return '0';

  const num = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(num)) return '0';

  return num.toLocaleString('ko-KR');
};

/**
 * 숫자를 원화 형식으로 포맷팅합니다.
 * @param number - 포맷팅할 숫자
 * @returns 원화 형식의 문자열 (예: "10,000원")
 */
export const formatCurrency = (number: number | string): string => {
  return `${formatNumber(number)}원`;
};
