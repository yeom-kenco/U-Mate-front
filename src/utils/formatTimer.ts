export const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(1, '0');
  const s = String(seconds % 60).padStart(1, '0');
  return `${m}분${s}초`;
};
