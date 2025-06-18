import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { SlArrowLeft } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
interface HeaderProps {
  showBackButton: boolean;
  showSearch: boolean;
  title?: string;
}

const Header = ({ showBackButton = false, showSearch = true, title = '요금제' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거 토글

  return (
    <header className=" w-full h-16  flex justify-center items-center px-5 py-6">
      <div className="relative container mx-auto  h-full flex items-center justify-between ">
        {showBackButton ? (
          <div className="flex items-center ">
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
        {showSearch ? (
          <IoIosSearch className="w-8 h-8" />
        ) : (
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center justify-end text-gray-700 hover:text-pink-500 transition-colors"
            >
              <FiUser className="w-7 h-7" />
            </Link>
            <button
              className="flex justify-end items-center w-2/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-700 transform transition-transform `} />
                <span className={`w-full h-0.5 bg-gray-700 transition-opacity `} />
                <span className={`w-full h-0.5 bg-gray-700 transform transition-transform `} />
              </div>
            </button>
          </nav>
        )}
      </div>

      {/* hambuger Menu */}
      <div
        className={` md:hidden
          fixed top-0 w-80 h-screen rounded-2xl transform transition-transform duration-500 ease-in-out bg-background
          ${isMenuOpen ? 'translate-x-24' : 'translate-x-96'}
        `}
      >
        <IoMdClose
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-6 h-6 absolute left-52 m-3"
        />
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link to="/mypage" className="text-gray-700 hover:text-pink-500 transition-colors">
            요금제페이지
          </Link>
          <Link to="/notifications" className="text-gray-700 hover:text-pink-500 transition-colors">
            요금제비교페이지
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
