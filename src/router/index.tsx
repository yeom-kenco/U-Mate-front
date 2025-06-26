import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import PricingPage from '../pages/PricingPage';
import OnBoarding from '../components/OnBoarding';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import MainPage from '../pages/MainPage';
import RegisterPage from '../pages/RegisterPage';
import ShortcutPage from '../pages/ShortcutPage';
import PlanDetailPage from '../pages/PlanDetailPage';
import NotFound from '../components/NotFound';
import ComparePage from '../pages/ComparePage';

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <MainPage />, // 대표 페이지
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
  {
    path: '/shortcut',
    element: <ShortcutPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
