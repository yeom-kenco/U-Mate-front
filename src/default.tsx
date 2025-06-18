import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';


const Default = () => {
  return (
    <>
      <Header />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Default;
