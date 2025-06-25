import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiMenu } from 'react-icons/fi';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/auth';
import { useToast } from '../hooks/useToast';
import { clearUser } from '../store/userSlice';
import { useAppSelector } from '../hooks/reduxHooks';

export interface HeaderProps {
  showBackButton: boolean;
  showSearch: boolean;
  title?: string;
  isLoggedIn?: boolean;
  hasShadow?: boolean;
}

const Header = ({
  showBackButton = false,
  showSearch = false,
  title = '대표페이지',
  isLoggedIn = false,
  hasShadow = false,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error('뒤로 가는 중 에러 발생:', error);
      navigate('/');
    }
  };
  const handleLogout = async () => {
    try {
      const res = await logout(user?.email);
      showToast(res.data.message, 'success');
      dispatch(clearUser());
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const NavigationLinks = ({ isLoggedIn }: { isLoggedIn?: boolean }) => (
    <>
      <Link to="/shortcut" className="hover:text-pink-500">
        바로가기페이지
      </Link>
      <Link to="/plans" className="hover:text-pink-500">
        요금제 찾기
      </Link>
      <Link to={`/compare?plan1=${user?.plan}`} className="hover:text-pink-500">
        요금제 비교하기
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/mypage" className="hover:text-pink-500">
            마이페이지
          </Link>
          <button className="hover:text-pink-500" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-pink-500">
            로그인
          </Link>
          <Link to="/signup" className="hover:text-pink-500">
            회원가입
          </Link>
        </>
      )}
    </>
  );

  return (
    <header
      className={`relative z-50 w-full h-16 flex justify-center items-center px-[5%] py-6 bg-white 
        ${hasShadow ? 'shadow-header' : 'shadow-none'} md:shadow-none md:px-10`}
    >
      <div className="relative w-full h-full flex items-center justify-between">
        {/* 뒤로가기: md 미만에서만 */}
        {showBackButton && (
          <div className="flex items-center md:hidden cursor-pointer" onClick={handleBack}>
            <SlArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lm w-32 h-6">{title}</span>
          </div>
        )}

        {/* 로고: md 이상에서는 항상, md 미만에서는 showBackButton이 false일 때만 */}
        <div
          className={`items-center justify-center 
    ${showBackButton ? 'hidden md:flex' : 'flex'}
  `}
        >
          <Link to="/" className="text-xl font-bold">
            <span className="text-pink-500">U:</span>
            <span className="text-xl font-bold m-1">Mate</span>
          </Link>
        </div>

        {/* 네비게이션 */}
        <div className="flex items-center gap-5">
          {showSearch ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm text-black">
                <NavigationLinks isLoggedIn={user?.name ? true : false} />
                <IoIosSearch className="w-6 h-6 ml-2" />
              </div>
              <div className="md:hidden">
                <IoIosSearch className="w-6 h-6" />
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm text-black">
                <NavigationLinks isLoggedIn={user?.name ? true : false} />
              </div>
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

      {/* 배경 어둡게 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9998] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 햄버거 메뉴 */}
      <div
        className={`md:hidden fixed top-0 right-0 w-80 h-screen rounded-3xl z-[9999] transform transition-transform duration-500 ease-in-out bg-background
        ${isMenuOpen ? 'translate-x-[2.4rem] max-[400px]:translate-x-10' : 'translate-x-full'}
      `}
      >
        <IoMdClose
          onClick={() => setIsMenuOpen(false)}
          className="w-6 h-6 absolute min-[400px]:left-56 min-[400px]:m-2 left-52 m-3 cursor-pointer"
        />

        {/* 사용자 인사 */}
        <div className="w-full h-52 flex justify-center items-center bg-diagonal rounded-2xl text-center max-[400px]:w-[290px]">
          <div className="flex flex-col gap-1 max-[400px]:translate-x-0 -translate-x-4">
            <img src="/images/bear/gom.png" alt="" className="w-20 h-20 mx-auto mb-2" />
            <span className="text-lm font-semibold">
              <span className="text-pink-500">{user?.name ? `${user?.name}님` : ''}</span>{' '}
              안녕하세요
            </span>
            <div className="flex items-center mb-[-20px] ml-4">
              <Link to="/mypage">
                <p className="text-sm">마이페이지 및 설정</p>
              </Link>
              <SlArrowRight className="w-[10px] h-[10px] ml-[2px]" />
            </div>
          </div>
        </div>

        {/* 메뉴 본문 */}
        <nav className="w-full mx-auto px-2 py-4 mt-2 flex flex-col">
          {user.name ? (
            <>
              {/* 🔓 로그아웃 버튼 */}
              <Button
                size="lg"
                color="violet"
                className="ml-3 mr-14 font-normal border-zinc-200 border"
                onClick={handleLogout}
              >
                로그아웃
              </Button>

              {/* ✅ 로그아웃 버튼과 메뉴 사이 간격 */}
              <div className="mt-6 flex flex-col space-y-3">
                <Link to="/plans" className="flex px-3 items-center max-w-48 cursor-pointer">
                  <span>요금제 찾아보기</span>
                  <SlArrowRight className="w-3 h-3 relative ml-[2px] mb-[1px]" />
                </Link>
                <Link to="/compare" className="flex px-3 items-center max-w-48 cursor-pointer">
                  <span>요금제 비교하기</span>
                  <SlArrowRight className="w-3 h-3 relative ml-[2px] mb-[1px]" />
                </Link>
                <Link to="/mypage" className="flex px-3 items-center max-w-48 cursor-pointer">
                  <span>마이페이지</span>
                  <SlArrowRight className="w-3 h-3 relative ml-[2px] mb-[1px]" />
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* 🔒 로그인 & 회원가입 */}
              <div className="flex gap-2 px-3">
                <Button
                  size="lg"
                  color="violet"
                  className="w-[118px] font-normal border-zinc-200 border"
                  onClick={() => navigate('/login')}
                >
                  로그인
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="gray"
                  className="w-[118px] border-zinc-200 border font-normal text-black"
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </Button>
              </div>

              {/* ✅ 버튼 아래 메뉴들 간격 */}
              <div className="mt-6 flex flex-col space-y-3">
                <Link to="/plans" className="flex px-3 items-center max-w-48 cursor-pointer">
                  <span>요금제 찾아보기</span>
                  <SlArrowRight className="w-3 h-3 relative ml-[2px]" />
                </Link>
                <Link to="/compare" className="flex px-3 items-center max-w-48 cursor-pointer">
                  <span>요금제 비교하기</span>
                  <SlArrowRight className="w-3 h-3 relative ml-[2px]" />
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
