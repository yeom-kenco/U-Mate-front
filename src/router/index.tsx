import { createBrowserRouter, RouterProvider, useOutletContext } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import BenefitDropBar from '../components/BenefitDropBar';
import { benefitList } from '../data/benefits';
import PricingPage from '../pages/PricingPage';
import OnBoarding from '../components/OnBoarding';
import LoginPage from '../pages/LoginPage';
import LoginBanner from '../components/LoginBanner';
import Modal from '../components/Modal';
import { HeaderProps } from '../components/Header';
import { useContext, useEffect } from 'react';
import Button from '../components/Button';

import { ToastContext } from '../context/ToastContext';

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

  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />
      <Button onClick={handleClick}>토스트 리뷰 삭제</Button>
      <Button onClick={() => toastContext?.showToast('비밀번호가 변경되었습니다!', 'success')}>
        토스트 성공
      </Button>
      <Button onClick={() => toastContext?.showToast('비밀번호가 일치하지 않습니다')}>
        토스트 실패
      </Button>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <TempPage />, // ✅ Outlet 채우기
      },
      { path: 'chatbot', element: <ChatbotMain /> },
      {
        path: '/terms',
        element: <TermsOfUsePage />,
      },
      { path: 'pricing', element: <PricingPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
