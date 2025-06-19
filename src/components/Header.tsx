import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { SlArrowLeft } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { SlArrowRight } from 'react-icons/sl';
import Button from './Button';
export interface HeaderProps {
  showBackButton: boolean;
  showSearch: boolean;
  title?: string;
}

const Header = ({ showBackButton = false, showSearch = false, title = '요금제' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거 토글
  const location = useLocation();
  const navigate = useNavigate();

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
        {showBackButton ? (
          <div className="flex items-center " onClick={BackPage}>
            <SlArrowLeft className="w-6 h-6 " />
            <span className="text-lm w-32 h-6">{title}</span>
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
        {/*사용자 정보 ?*/}
        <div className="w-full h-48 flex justify-center items-center bg-diagonal rounded-2xl  text-center max-[400px]:w-[260px]">
          <div className="flex  flex-col gap-1 max-[400px]:translate-x-0 -translate-x-4">
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
        {/*메뉴 */}
        <nav className="w-full mx-auto  px-2 py-2  flex flex-col space-y-2 ">
          {/*비로그인 */}
          <div className="flex  gap-1 max-[400px]:gap-2">
            <Button
              size="lg"
              color="violet"
              className="max-[400px]:w-28 w-32 font-normal border-zinc-200 border"
            >
              로그인
            </Button>
            <Button
              size="lg"
              color="gray"
              className=" max-[400px]:w-28 w-32 border-zinc-200 border font-normal  text-gray-950"
            >
              회원가입
            </Button>
          </div>
          {/*로그인했을때 */}
          {/* <Button size="lg" color="pink" className="max-[400px]:w-56 w-64 ">
            로그아웃
          </Button>
          <Link className="flex" to="/pricing">
            <p className=" max-w-48 cursor-pointer">요금제 찾아보기</p>
            <SlArrowRight className="w-3 h-3 relative top-[5px] ml-[2px]" />
          </Link> */}

          <div className="flex pt-4">
            <Link to="/pricing" className=" max-w-48 cursor-pointer">
              요금제 찾아보기
            </Link>
            <SlArrowRight className="w-3 h-3 relative top-[5px] ml-[2px]" />
          </div>
          <div className="flex">
            <Link to="/pricing" className=" max-w-48 cursor-pointer">
              요금제 비교하기
            </Link>
            <SlArrowRight className="w-3 h-3 relative top-[5px] ml-[2px]" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
