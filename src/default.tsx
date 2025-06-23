import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useState } from 'react';
import ChatbotButton from './components/ChatbotButton';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '대표페이지',
    showBackButton: false,
    showSearch: false,
    hasShadow: false,
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh+1px)]">
      {/* 헤더 */}
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        showSearch={headerConfig.showSearch}
        hasShadow={headerConfig.hasShadow}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-grow">
        <div className="min-h-[calc(100vh-64px)]">
          {' '}
          {/* 64px는 Header 높이 */}
          <Outlet context={setHeaderConfig} />
        </div>
      </main>

      {/* 챗봇 버튼 (고정된 위치에 표시됨) */}
      <ChatbotButton />

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Default;
