import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatbotButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/chatbot')}
      className="fixed min-h-0 bottom-24 right-[calc(10%)] z-50 w-16 h-16 rounded-full bg-chatbot bg-cover bg-center shadow-md flex items-center justify-center overflow-hidden"
      aria-label="챗봇 열기"
    >
      <img
        src="/images/chatbot/chatbot-main.png"
        alt="챗봇 아이콘"
        className="mb-[-13px] w-16 h-16 object-contain"
      />
    </button>
  );
}
