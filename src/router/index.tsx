import { createBrowserRouter, RouterProvider, useOutletContext } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import BenefitDropBar from '../components/BenefitDropBar';
import { benefitList } from '../data/benefits';
import PricingPage from '../pages/PricingPage';
import ChatBubble from '../components/ChatBubble';
import OnBoarding from '../components/OnBoarding';
import LoginPage from '../pages/LoginPage';
import { HeaderProps } from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../context/ToastContext';
import Button from '../components/Button';
import MyPage from '../pages/MyPage';
import MainPage from '../pages/MainPage';
import RegisterPage from '../pages/RegisterPage';
import ShortcutPage from '../pages/ShortcutPage';
import PlanDetailPage from '../pages/PlanDetailPage';
import NotFound from '../components/NotFound';
import ComparePage from '../pages/ComparePage';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

// 테스트용 임시 페이지
const TempPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  useEffect(() => {
    setHeaderConfig({
      showBackButton: false,
      showSearch: false,
    });
  }, []);

  const toastContext = useContext(ToastContext);

  const handleClick = () => {
    toastContext?.showToast('리뷰가 삭제되었습니다!', 'black');
  };

  // 모달 테스트
  // const dispatch = useAppDispatch();

  // const handleOpen = () => {
  //   dispatch(openModal());
  // };

  // const handleClose = () => {
  //   dispatch(closeModal());
  // };

  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const [planopen, setPlanOpen] = useState(false); // 정렬 시트 토글
  const [isPlan, setisPlan] = useState(''); // 선택한 요금제
  // const isOpen = useAppSelector((state) => state.modal.isOpen);

  const handlePlanSelect = (value: string) => {
    setisPlan(value);
    setPlanOpen(false);
  };
  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />
      <Button variant="outline" color="gray" size="s">
        outline
      </Button>
      <Button onClick={handleClick}>토스트 리뷰 삭제</Button>
      <Button onClick={() => toastContext?.showToast('비밀번호가 변경되었습니다!', 'success')}>
        토스트 성공
      </Button>
      <Button onClick={() => toastContext?.showToast('비밀번호가 일치하지 않습니다')}>
        토스트 실패
      </Button>
      <ChatBubble
        from="bot"
        message="ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ?"
        time="16:00"
      />
      <ChatBubble
        from="user"
        message="ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ?"
        time="16:00"
      />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <MainPage />, // 대표 페이지
      },
      {
        path: '/shortcut',
        element: <ShortcutPage />, // 바로가기 페이지
      },
      {
        path: '/test',
        element: <TempPage />, // 테스트용 페이지 라우터 재정의
      },
      { path: 'chatbot', element: <ChatbotMain /> },
      {
        path: '/terms', // 푸터 이용약관 페이지
        element: <TermsOfUsePage />,
      },
      { path: 'plans', element: <PricingPage /> }, // 요금제 페이지
      { path: '/plans/:id', element: <PlanDetailPage /> }, //요금제 상세 페이지
      { path: '/compare', element: <ComparePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/signup', element: <RegisterPage /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
