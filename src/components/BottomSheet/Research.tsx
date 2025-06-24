import type React from 'react';
import { useState } from 'react';

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

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(rating, feedback);
    }
    setIsSubmitted(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 1500);
  };

  const canSubmit = feedback.trim().length > 0;

  return (
    <div className="relative w-full max-w-[412px] mx-auto bg-white rounded-t-[18px] px-5 py-6">
      {/* 타이틀 영역 */}
      <div className="mb-8">
        <h1
          className="text-[18px] font-semibold leading-6 mb-3"
          style={{
            background: 'linear-gradient(105deg, #BA0087 9.18%, #33059C 59.8%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          유메이트 챗봇,
          <br />
          만족하셨다면 추천하실 의향이 있으신가요?
        </h1>
        <p className="text-[14px] font-semibold leading-[19px] text-[#ABB3BC]">
          이용해본 경험을 바탕으로
          <br />
          지인에게 얼마나 추천하고 싶으신가요
        </p>
      </div>

      {/* 점수 표시 */}
      <div className="text-center mb-6">
        <div className="flex items-end justify-center">
          <span
            className={`text-[64px] font-bold leading-[86px] ${hasInteracted ? 'text-[#F6339A]' : 'text-[#9F9FA9]'}`}
          >
            {rating}
          </span>
          <span className="text-[18px] font-semibold leading-6 text-[#9F9FA9] ml-1 mb-3">점</span>
        </div>
      </div>

      {/* 슬라이더 영역 */}
      <div className="mb-8">
        {/* 숫자와 구분선 통합 - 하나의 행 (슬라이더 위로 이동) */}
        <div className="flex justify-between items-center mb-4 px-1">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="flex items-center justify-center">
              {/* 0, 5, 10 위치에는 숫자 표시, 나머지는 구분선 */}
              {i === 0 || i === 5 || i === 10 ? (
                <span className="text-[16px] font-semibold leading-[21px] text-[#9F9FA9]">{i}</span>
              ) : (
                <div className="w-[1px] h-[18px] bg-[#9F9FA9] opacity-30" />
              )}
            </div>
          ))}
        </div>

        <div className="relative mb-4">
          {/* 슬라이더 트랙 */}
          <div className="w-full h-[11px] bg-[#E8EBEE] rounded-[12px] relative">
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
              className="absolute top-1/2 w-[30px] h-[30px] bg-white border-[5px] border-[#E60076] rounded-full transform -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={{ left: `${(rating / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* 슬라이더 라벨 */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-semibold leading-[19px] text-[#52525C]">
            추천하지 않아요
          </span>
          <span className="text-[14px] font-semibold leading-[19px] text-[#52525C]">
            매우 추천해요
          </span>
        </div>
      </div>

      <hr className="border-t border-black/13 mb-6" />

      {/* 상세 의견 입력 */}
      <div className="mb-8">
        <h3 className="text-[16px] font-semibold leading-[21px] text-[#27272A] mb-4">
          상세 의견을 입력해주세요
        </h3>
        <div className="relative">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="의견을 자세하게 들려주세요.
더 좋은 서비스 제공을 위해 기록됩니다."
            className="w-full h-[156px] p-4 bg-[#FAFAFA] border border-[#E4E4E7] rounded-lg resize-none text-[14px] leading-[19px] text-black placeholder-[#9F9FA9] focus:outline-none focus:border-[#F6339A]"
            maxLength={100}
          />
          <div className="absolute bottom-3 right-3 text-[10px] leading-[13px] text-[#9F9FA9] tracking-[0.05em]">
            {feedback.length} / 100
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="space-y-3">
        {isSubmitted ? (
          <div className="w-full h-[62px] bg-green-500 text-white rounded-lg font-semibold text-[16px] flex items-center justify-center">
            제출 완료! 감사합니다 ✨
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full h-[62px] rounded-lg font-semibold text-[16px] leading-[21px] transition-colors ${
              canSubmit
                ? 'bg-[#F6339A] text-white hover:bg-[#E60076]'
                : 'bg-[#F4F4F5] text-[#9F9FA9] cursor-not-allowed'
            }`}
          >
            평가 제출
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full h-[62px] bg-[#F4F4F5] text-[#9F9FA9] rounded-lg font-semibold text-[16px] leading-[21px] hover:bg-[#E4E4E7] transition-colors"
        >
          다음에 하기
        </button>
      </div>
    </div>
  );
};

export default Research;
