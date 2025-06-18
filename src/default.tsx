import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import ChatbotButton from './components/ChatbotButton.tsx';
import LoginBanner from './components/LoginBanner.tsx';

const Default = () => {
  return (
    <>
      <Header showBackButton={false} showSearch={true} />
      <LoginBanner type="default" />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
      <ChatbotButton />
    </>
  );
};

export default Default;
