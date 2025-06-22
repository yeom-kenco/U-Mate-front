import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useState } from 'react';
import ChatbotButton from './components/ChatbotButton.tsx';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '마이페이지',
    showBackButton: false,
    showSearch: true,
  });

  return (
    <>
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        showSearch={headerConfig.showSearch}
      />
      <div>
        <Outlet context={setHeaderConfig} />
      </div>
      <ChatbotButton />
      <Footer />
    </>
  );
};

export default Default;
