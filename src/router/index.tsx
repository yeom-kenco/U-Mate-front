// router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import Button from '../components/Button';
import BenefitDropBar from '../components/BenefitDropBar';
import { benefitList } from '../data/benefits';
import PricingPage from '../pages/PricingPage';
import LoginPage from '../pages/LoginPage';
import LoginBanner from '../components/LoginBanner';

// 테스트용 임시 페이지
const TempPage = () => {
  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />
      <Button variant="outline" color="gray" size="s">
        outline
      </Button>
      <LoginBanner type="mainGradient" />
      <LoginBanner type="mainWhite" />
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
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
