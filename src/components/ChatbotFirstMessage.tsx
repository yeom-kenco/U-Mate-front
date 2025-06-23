import type React from 'react';

interface FirstMessageProps {
  onQuestionClick?: (question: string) => void;
}

const FirstMessage: React.FC<FirstMessageProps> = ({ onQuestionClick }) => {
  const suggestedQuestions = [
    {
      iconSrc: '/images/chatbot/chatbot-coin.png',
      category: '맞춤 요금제 찾기',
      question: '어떤 요금제로 바꾸면 좋을까요?',
      color: 'text-pink-500',
    },
    {
      iconSrc: '/images/chatbot/chatbot-thumbsup.png',
      category: '요금제 비교',
      question: '내 요금제와 다른 요금제 비교하고 싶어요.',
      color: 'text-pink-500',
    },
    {
      iconSrc: '/images/chatbot/chatbot-info.png',
      category: '개인정보 보호 알아보기',
      question: '내 개인정보는 어떻게 보호되고 있나요?',
      color: 'text-pink-500',
    },
  ];

  const handleQuestionClick = (question: string) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className="w-full max-w-[315px] mx-auto bg-white rounded-t-none rounded-b-[22px] rounded-r-[22px] shadow-lg overflow-hidden">
      {/* 상단 우주 배경 이미지 영역 */}
      <div className="relative w-full h-[177px] bg-gradient-to-br from-purple-600 via-blue-500 to-purple-800 rounded-t-none rounded-tr-[22px] overflow-hidden">
        <img
          src="/images/chatbot/chatbot-first-bg.png"
          alt="유식이 캐릭터 우주 배경"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-4 space-y-4">
        {/* 인사말 */}
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-black leading-[21px]">
            고객님 안녕하세요.
            <br />
            저는 U:Mate의 상담챗봇 <span className="text-pink-500">유식이</span>입니다.
          </h2>

          <p className="text-s text-gray-600 leading-4">
            저는 이전 대화도 기억해서 나에게 맞는 정보를 바탕으로 똑똑하게 도와드릴 수 있어요.
            <br />
            <br />
            단, 서비스와 관련 없는 질문은 답변이 어려울 수 있어요🥲
          </p>
        </div>

        {/* 질문 제안 섹션 */}
        <div className="space-y-3">
          <h3 className="text-m font-semibold text-pink-500">아래와 같이 질문해보세요!</h3>

          <div className="space-y-3">
            {suggestedQuestions.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-[30px] text-left"
              >
                <div className="flex-shrink-0 w-[42px] h-[37px] flex items-center justify-center">
                  <img
                    src={item.iconSrc}
                    alt={item.category}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className={`text-xs font-semibold ${item.color}`}>{item.category}</div>
                  <div className="text-s font-semibold text-black">{item.question}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstMessage;
