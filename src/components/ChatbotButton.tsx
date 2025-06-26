import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatbotButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-[5%] right-[2%] z-50 flex flex-col items-center gap-1">
      {/* 말풍선 */}
      <div className="relative hidden md:block mb-[-30px] right-[55px] px-3 py-1 bg-gray-700 text-white text-s rounded-full shadow-md animate-pulse z-10">
        반가워요!
      </div>

      {/* 챗봇 버튼 */}
      <button
        onClick={() => navigate('/chatbot')}
        className="floating w-[4.3rem] h-[4.3rem] rounded-full bg-chatbot bg-cover bg-center shadow-md flex items-center justify-center overflow-hidden
             transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        aria-label="챗봇 열기"
      >
        <img
          src="/images/chatbot/chatbot-main.png"
          alt="챗봇 아이콘"
          className="mb-[-13px] w-16 h-16 object-contain"
        />
      </button>
    </div>
  );
}
