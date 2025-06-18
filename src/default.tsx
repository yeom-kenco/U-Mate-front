import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import ChatbotButton from './components/ChatbotButton.tsx';
import PricingPage from './pages/PricingPage.tsx';

const Default = () => {
  return (
    <>
<<<<<<< Feat/혜택-컴포넌트
      <Header showBackButton={false} showSearch={true} />
=======
      <Header />
>>>>>>> main
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
      <ChatbotButton />
    </>
  );
};

export default Default;
