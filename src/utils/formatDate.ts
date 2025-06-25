export const formatToKST = (utcDateString: string): string => {
  const date = new Date(utcDateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식 반환
};

export const formatToShortKoreanDate = (utcDateString: string): string => {
  const date = new Date(utcDateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = String(kstDate.getFullYear()).slice(-2); // 뒤 2자리
  const month = String(kstDate.getMonth() + 1).padStart(2, '0'); // 0~11 → +1
  const day = String(kstDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};