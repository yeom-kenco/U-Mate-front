import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import ChatbotButton from './components/ChatbotButton.tsx';
import PricingPage from './pages/PricingPage.tsx';

const Default = () => {
  return (
    <>
      <Header showBackButton={false} showSearch={false  } />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
      <ChatbotButton />
    </>
  );
};

export default Default;
