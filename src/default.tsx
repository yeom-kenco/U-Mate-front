import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import ChatbotButton from './components/ChatbotButton';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from './apis/auth';
import { clearUser, setUser } from './store/userSlice';
import { useToast } from './hooks/useToast';
import { formatToKST } from './utils/formatDate';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '대표페이지',
    showBackButton: false,
    showSearch: false,
    hasShadow: false,
  });
  const [userLoading, setUserLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const res = await validateToken();
        const { user } = res.data;
        console.log(user);
        if (res && user) {
          const { email, birthDay, id, membership, name, plan } = user;
          //한국 날짜로
          const korBirthDay = formatToKST(birthDay);
          dispatch(
            setUser({
              id,
              name,
              birthDay: korBirthDay,
              email,
              plan,
              membership,
            })
          );
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (userLoading) {
    return <div className="text-center mt-10">loading...</div>;
  }
  console.log(user);
  return (
    <div className="flex flex-col min-h-[calc(100vh+1px)]">
      {/* 헤더 */}
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        showSearch={headerConfig.showSearch}
        hasShadow={headerConfig.hasShadow}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-grow">
        <div className="min-h-[calc(100vh-64px)]">
          {/* 64px는 Header 높이 */}
          <Outlet context={setHeaderConfig} />
        </div>
      </main>

      {/* 챗봇 버튼 (고정된 위치에 표시됨) */}
      {pathname !== '/chatbot' && <ChatbotButton />}

      {/* 푸터 */}
      {pathname !== '/chatbot' && <Footer />}
    </div>
  );
};

export default Default;
