import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import ShortcutCarousel from './components/shortcut/ShortcutCarousel.tsx';
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
      <div className="w-[90%] mx-auto">
        <Outlet context={setHeaderConfig} />
      </div>
      <ShortcutCarousel />
      <Footer />
    </>
  );
};

export default Default;
