import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import CheckBox from './components/ChekBox';
import ChatbotButton from './components/ChatbotButton.tsx';

const Default = () => {
  return (
    <>
      <Header showBackButton={false} showSearch={true} />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
      <ChatbotButton />
    </>
  );
};

export default Default;
