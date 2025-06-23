import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ChatbotButton from './components/ChatbotButton';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from './apis/auth';
import { clearUser, setUser } from './store/userSlice';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '대표페이지',
    showBackButton: false,
    showSearch: false,
    hasShadow: false,
  });
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await validateToken();
        console.log(res.data);
        if (res.data) {
          const { email } = res.data.user;
          dispatch(
            setUser({
              id: 0,
              name: '',
              birthDay: '',
              email,
              plan: 0,
              membership: null,
            })
          );
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

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
          {' '}
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
