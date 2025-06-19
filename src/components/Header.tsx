import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { SlArrowLeft } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { SlArrowRight } from 'react-icons/sl';
interface HeaderProps {
  showBackButton: boolean;
  showSearch: boolean;
  title?: string;
}

const Header = ({ showBackButton = false, showSearch = false, title = '요금제' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거 토글
  const location = useLocation();
  const navigate = useNavigate();
  const isChatbot = location.pathname !== '/chatbot' ? showSearch : !showSearch;

  const isPage = location.pathname === '/' ? showBackButton : !showBackButton;

  //
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const BackPage = () => {
    navigate(-1);
  };
  return (
    <header className=" w-full h-16  flex justify-center items-center px-5 py-6">
      <div className="relative container mx-auto  h-full flex items-center justify-between ">
        {isPage ? (
          <div className="flex items-center " onClick={BackPage}>
            <SlArrowLeft className="w-6 h-6 " />
            <span className="text-lm w-20 h-6">{title}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center relative ">
            <Link to="/" className="text-xl font-bold">
              <span className="text-pink-500">U:</span>
              <span className="text-xl font-bold">Mate</span>
            </Link>
          </div>
        )}

        {/*  Navigation */}
        {isChatbot ? (
          <IoIosSearch className="w-8 h-8" />
        ) : (
          <nav className="flex items-center gap-10">
            <Link
              to="/pricing"
              className="flex items-center justify-end text-black hover:text-pink-500 transition-colors"
            >
              <FiUser className="w-7 h-7" />
            </Link>
            <button
              className="flex justify-end items-center w-2/5"
              onClick={() => setIsMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-black transform transition-transform `} />
                <span className={`w-full h-0.5 bg-black transition-opacity `} />
                <span className={`w-full h-0.5 bg-black transform transition-transform `} />
              </div>
            </button>
          </nav>
        )}
      </div>

      {/* backdrop  */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9998] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* hambuger Menu */}
      <div
        className={` md:hidden
          fixed top-0 w-80 h-screen rounded-2xl z-[9999] transform transition-transform duration-500 ease-in-out bg-background
          ${isMenuOpen ? 'translate-x-24' : 'translate-x-96'}
        `}
      >
        <IoMdClose
          onClick={() => setIsMenuOpen(false)}
          className="w-6 h-6 absolute min-[400px]:left-56 min-[400px]:m-2 left-52 m-3 cursor-pointer"
        />
        <div className="w-72 h-48 grid place-items-center bg-diagonal rounded-2xl  text-center max-[400px]:w-[260px]">
          <div className="flex flex-col gap-1">
            <img src="/images/bear/gom.png" alt="" className="w-20 h-20 mx-auto mb-2" />
            <span className="text-lm font-semibold">
              <span className="text-pink-500">000님</span> 안녕하세요
            </span>
            <div className="flex ml-4">
              <p className="text-s">마이페이지 및 설정</p>
              <SlArrowRight className="w-[10px] h-[10px] relative top-[3px] ml-[2px]" />
            </div>
          </div>
        </div>

        <nav className="container mx-auto my-4 px-4 py-4 flex flex-col space-y-4">
          <Link className="flex" to="/pricing">
            <p className=" max-w-48 cursor-pointer">요금제 찾아보기</p>
            <SlArrowRight className="w-3 h-3 relative top-[5px] ml-[2px]" />
          </Link>

          <div className="flex">
            <Link to="/pricing" className=" max-w-48 cursor-pointer">
              요금제 비교 하기
            </Link>
            <SlArrowRight className="w-3 h-3 relative top-[5px] ml-[2px]" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
