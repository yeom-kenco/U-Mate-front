import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import ChatbotButton from './components/ChatbotButton';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from './apis/auth';
import { clearUser, setUser } from './store/userSlice';
import { useToast } from './hooks/useToast';

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await validateToken();
        const { user } = res.data;
        if (res && user) {
          const { email, birthDay, id, membership, name, plan } = user;
          //한국 날짜로
          const date = new Date(birthDay);
          const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
          const korBirthDay = kstDate.toISOString().split('T')[0];
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
      <ChatbotButton />

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Default;
