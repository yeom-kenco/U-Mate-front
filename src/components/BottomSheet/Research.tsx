import type React from 'react';
import { useState } from 'react';
import { postSurvey } from '../../apis/ServeyApi';

interface ResearchProps {
  onSubmit?: (rating: number, feedback: string) => void;
  onClose?: () => void;
}

const Research: React.FC<ResearchProps> = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
    setHasInteracted(true);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  // Research.tsx ─ handleSubmit 안
  const handleSubmit = async () => {
    try {
      await postSurvey({ rating, content: feedback });

      localStorage.setItem('surveySubmitted', 'true');

      onSubmit?.(rating, feedback);

      setIsSubmitted(true);
      setTimeout(() => onClose?.(), 1500);
    } catch (error) {
      // Error handled silently
    }
  };

  const canSubmit = feedback.trim().length > 0;

  return (
    <div className="relative w-full mx-auto bg-white rounded-t-[18px] px-4 py-4">
      {/* 타이틀 영역 */}
      <div className="mb-5">
        <h1 className="text-[16px] font-semibold leading-5 mb-2">
          {/* ▽ 그라디언트 적용 부분 */}
          <span
            style={{
              background: 'linear-gradient(105deg, #BA0087 9.18%, #33059C 59.8%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            유메이트 챗봇,
          </span>
          <br />
          {/* ▽ 검정색(기본 텍스트 색)으로 표시 */}
          <span className="text-black">만족하셨다면 추천하실 의향이 있으신가요?</span>
        </h1>
        <p className="text-[12px] font-medium leading-4 text-[#ABB3BC]">
          이용해본 경험을 바탕으로
          <br />
          지인에게 얼마나 추천하고 싶으신가요
        </p>
      </div>

      {/* 점수 표시 */}
      <div className="text-center mb-4">
        <div className="flex items-end justify-center">
          <span
            className={`text-[56px] font-bold leading-[70px] ${hasInteracted ? 'text-[#F6339A]' : 'text-[#9F9FA9]'}`}
          >
            {rating}
          </span>
          <span className="text-[16px] font-semibold leading-5 text-[#9F9FA9] ml-1 mb-2">점</span>
        </div>
      </div>

      {/* 슬라이더 영역 */}
      <div className="mb-5">
        {/* 숫자와 구분선 통합 - 하나의 행 (슬라이더 위로 이동) */}
        <div className="flex justify-between items-center mb-3 px-1">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="flex items-center justify-center">
              {/* 0, 5, 10 위치에는 숫자 표시, 나머지는 구분선 */}
              {i === 0 || i === 5 || i === 10 ? (
                <span className="text-[14px] font-semibold leading-4 text-[#9F9FA9]">{i}</span>
              ) : (
                <div className="w-[1px] h-[16px] bg-[#9F9FA9] opacity-30" />
              )}
            </div>
          ))}
        </div>

        <div className="relative mb-3">
          {/* 슬라이더 트랙 */}
          <div className="w-full h-[10px] bg-[#E8EBEE] rounded-[12px] relative">
            <input
              type="range"
              min="0"
              max="10"
              value={rating}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* 슬라이더 핸들 */}
            <div
              className="absolute top-1/2 w-[26px] h-[26px] bg-white border-[4px] border-[#E60076] rounded-full transform -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={{ left: `${(rating / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* 슬라이더 라벨 */}
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-medium leading-4 text-[#52525C]">추천하지 않아요</span>
          <span className="text-[12px] font-medium leading-4 text-[#52525C]">매우 추천해요</span>
        </div>
      </div>

      <hr className="border-t border-black/13 mb-4" />

      {/* 상세 의견 입력 */}
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold leading-5 text-[#27272A] mb-3">
          상세 의견을 입력해주세요
        </h3>
        <div className="relative">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="의견을 자세하게 들려주세요.
더 좋은 서비스 제공을 위해 기록됩니다."
            className="w-full h-[120px] p-3 bg-[#FAFAFA] border border-[#E4E4E7] rounded-lg resize-none text-[13px] leading-4 text-black placeholder-[#9F9FA9] focus:outline-none focus:border-[#F6339A]"
            maxLength={100}
          />
          <div className="absolute bottom-2 right-2 text-[9px] leading-3 text-[#9F9FA9] tracking-[0.05em]">
            {feedback.length} / 100
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="space-y-3">
        {isSubmitted ? (
          <div className="w-full h-[52px] bg-green-500 text-white rounded-lg font-semibold text-[14px] flex items-center justify-center">
            제출 완료! 감사합니다 ✨
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full h-[52px] rounded-lg font-semibold text-[14px] leading-5 transition-colors ${
              canSubmit
                ? 'bg-[#F6339A] text-white hover:bg-[#E60076]'
                : 'bg-[#F4F4F5] text-[#9F9FA9] cursor-not-allowed'
            }`}
          >
            평가 제출
          </button>
        )}

        <div className="text-center pb-2">
          <button
            onClick={onClose}
            className="text-[#9F9FA9] text-[14px] font-medium hover:text-[#7A7A7A] transition-colors"
          >
            다음에 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Research;
