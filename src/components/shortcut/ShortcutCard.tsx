// components/ShortcutCard.tsx
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface ShortcutCardProps {
  icon: React.ReactNode; // 3D 아이콘 (예: <img />, <svg />, etc.)
  title: string;
  description: string;
  onClick?: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-purple-100 relative rounded-3xl shadow-lg p-6 flex flex-col items-center text-center
             transition transform duration-150 active:scale-95 hover:shadow-lg cursor-pointer w-[310px] h-[380px]"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm  mb-4 max-w-[15rem] break-words">{description}</p>

      {/* 바로가기 버튼: 우측 하단 */}
      <div className="absolute bottom-4 right-4 text-sm text-black flex items-center gap-1">
        바로가기 <FiChevronRight size={20} className="text-gray-900 mb-1" />
      </div>
    </div>
  );
};

export default ShortcutCard;

// 바로가기 페이지 카드 3개
// 1. 대표 페이지
/*
<ShortcutCard
  icon={<img src="/images/shortcut/shortcut-main.png" alt="대표 페이지" className="w-30 h-30" />}
  title="대표 페이지"
  description="다양한 이벤트부터 요금제, 혜택, 비교까지 필요한 정보를 한 번에 확인하세요."
  onClick={() => console.log('대표 페이지로 이동')}
/>
*/
// 2. 요금제 페이지
/*
<ShortcutCard
  icon={<img src="/images/shortcut/shortcut-looking.png" alt="요금제 살펴보기" className="w-30 h-30" />}
  title="요금제 살펴보기"
  description="내게 꼭 맞는 요금제, 지금 바로 살펴보세요"
  onClick={() => console.log('요금제 페이지로 이동')}
/>
*/
// 3. 챗봇 페이지
/*
<ShortcutCard
  icon={<img src="/images/shortcut/shortcut-chatbot.png" alt="상담봇과 대화하기" className="w-30 h-30" />}
  title="상담봇과 대화하기"
  description="요금제부터 혜택까지 궁금한 내용을 친절히 안내해 드려요."
  onClick={() => console.log('챗봇 열기')}
/>
*/
