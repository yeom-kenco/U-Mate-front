import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import ShortcutCarousel from './components/shortcut/ShortcutCarousel.tsx';

const Default = () => {
  return (
    <>
      <Header showBackButton={false} showSearch={true} />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <ShortcutCarousel />
      <Footer />
    </>
  );
};

export default Default;
