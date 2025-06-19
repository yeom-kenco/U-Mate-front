import React from 'react';
import { HeaderProps } from '../components/Header';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
export default function ChatbotMain() {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  useEffect(() => {
    setHeaderConfig({
      title: 'U:M 상담챗봇',
      showBackButton: true,
      showSearch: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <h1 className="text-xl font-bold">🤖 임시 챗봇 페이지입니다!</h1>
    </div>
  );
}
