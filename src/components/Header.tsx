import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
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

const NavigationLinks = () => (
  <>
    <Link to="/pricing" className="hover:text-pink-500">
      요금제 찾기
    </Link>
    <Link to="/compare" className="hover:text-pink-500">
      요금제 비교하기
    </Link>
    <Link to="/login" className="hover:text-pink-500">
      로그인
    </Link>
    <Link to="/signup" className="hover:text-pink-500">
      회원가입
    </Link>
  </>
);

const Header = ({
  showBackButton = false,
  showSearch = false,
  title = '마이페이지',
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거 토글
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const BackPage = () => {
    navigate(-1);
  };
  return (
    <header className=" w-full h-16 flex justify-center items-center px-[5%] py-6 shadow-header md:shadow-none">
      <div className="relative w-full h-full flex items-center justify-between ">
        {/* 뒤로가기: md 미만에서만 보임 */}
        {showBackButton && (
          <div className="flex items-center md:hidden cursor-pointer" onClick={BackPage}>
            <SlArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lm w-32 h-6">{title}</span>
          </div>
        )}

        {/* 로고: md 이상에서는 항상, md 미만에서는 뒤로가기 없을 때만 보임 */}
        {(!showBackButton || window.innerWidth >= 768) && (
          <div
            className={`items-center justify-center ${showBackButton ? 'hidden md:flex' : 'flex'}`}
          >
            <Link to="/" className="text-xl font-bold">
              <span className="text-pink-500">U:</span>
              <span className="text-xl font-bold m-1">Mate</span>
            </Link>
          </div>
        )}

        {/*  Navigation */}
        {/* 이 영역 전체를 조건별로 분기 */}
        <div className="flex items-center gap-5">
          {showSearch ? (
            <>
              {/* ✅ md 이상: 검색 + 메뉴 */}
              <div className="hidden md:flex items-center gap-6 text-sm text-black">
                <NavigationLinks />
                <IoIosSearch className="w-6 h-6 ml-2" />
              </div>

              {/* ✅ md 미만: 검색만 */}
              <div className="md:hidden">
                <IoIosSearch className="w-6 h-6" />
              </div>
            </>
          ) : (
            <>
              {/* ✅ md 이상: 메뉴만 */}
              <div className="hidden md:flex items-center gap-6 text-sm text-black">
                <NavigationLinks />
              </div>

              {/* ✅ md 미만: 마이페이지 + 햄버거 메뉴 */}
              <div className="flex md:hidden items-center gap-5">
                <Link to="/mypage" className="flex items-center text-black hover:text-pink-500">
                  <FiUser className="w-6 h-6" strokeWidth={1.5} />
                </Link>
                <button
                  className="flex items-center"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="메뉴 열기"
                >
                  <FiMenu className="w-7 h-7 text-black" />
                </button>
              </div>
            </>
          )}
        </div>
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
        className={`md:hidden fixed top-0 right-0 w-80 h-screen rounded-3xl z-[9999] transform transition-transform duration-500 ease-in-out bg-background
          ${isMenuOpen ? 'translate-x-[2.8rem] max-xs:translate-x-10 ' : 'translate-x-full'}
        `}
      >
        <IoMdClose
          onClick={() => setIsMenuOpen(false)}
          className="w-6 h-6 absolute min-[400px]:left-56 min-[400px]:m-2 left-52 m-3 cursor-pointer"
        />
        {/*사용자 정보 ?*/}
        <div className="w-full h-52 flex justify-center items-center bg-diagonal rounded-2xl text-center max-[400px]:w-[260px]">
          <div className="flex  flex-col gap-1 max-[400px]:translate-x-0 -translate-x-4">
            <img src="/images/bear/gom.png" alt="" className="w-20 h-20 mx-auto mb-2" />
            <span className="text-lm font-semibold">
              <span className="text-pink-500">000님</span> 안녕하세요
            </span>
            <div className="flex items-center mb-[-20px] ml-4">
              <p className="text-sm">마이페이지 및 설정</p>
              <SlArrowRight className="w-[10px] h-[10px] ml-[2px]" />
            </div>
          </div>
        </div>
        {/*메뉴 */}
        <nav className="w-full mx-auto  px-2 py-2 mt-2 flex flex-col space-y-2 ">
          {/*비로그인 */}
          <div className="flex  gap-2  m px-2">
            <Button
              size="lg"
              color="violet"
              className="max-[400px]:w-[108px]  w-[118px] font-normal border-zinc-200 border"
            >
              로그인
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="gray"
              className=" max-[400px]:w-[108px]  w-[118px] border-zinc-200 border font-normal text-black  "
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

          <div className="flex pt-6 px-2">
            <Link to="/pricing" className="flex items-center max-w-48 cursor-pointer">
              <span>요금제 찾아보기</span>
              <SlArrowRight className="w-3 h-3 relative ml-[2px]" />
            </Link>
          </div>
          <div className="flex px-2">
            <Link to="/pricing" className="flex items-center max-w-48 cursor-pointer mt-1">
              <span>요금제 비교하기</span>
              <SlArrowRight className="w-3 h-3 relative ml-[2px]" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
