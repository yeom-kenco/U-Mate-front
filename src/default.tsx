import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import LoginBanner from './components/LoginBanner.tsx';
import { useState } from 'react';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '요금제',
    showBackButton: false,
    showSearch: false,
  });

  return (
    <>
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        showSearch={headerConfig.showSearch}
      />
      <LoginBanner type="chatbot" />
      <div className="w-[90%] mx-auto">
        <Outlet context={setHeaderConfig} />
      </div>
      <ShortcutCarousel />
      <Footer />
    </>
  );
};

export default Default;
