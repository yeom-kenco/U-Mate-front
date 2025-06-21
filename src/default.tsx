import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import LoginBanner from './components/LoginBanner.tsx';
// import ShortcutCarousel from './components/shortcut/ShortcutCarousel.tsx';
import { useState } from 'react';
import ChatbotButton from './components/ChatbotButton.tsx';
// import EventBannerCarousel from './components/EventBanner/EventBannerCarousel.tsx';

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
      {/* <LoginBanner type="chatbot" /> */}
      <div>
        <Outlet context={setHeaderConfig} />
      </div>
      {/* <EventBannerCarousel /> */}
      {/* <ShortcutCarousel /> */}
      <ChatbotButton />
      <Footer />
    </>
  );
};

export default Default;
