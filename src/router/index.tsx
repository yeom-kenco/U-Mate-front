// router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import BenefitList from '../components/BenefitList';

// 테스트용 임시 페이지
const TempPage = () => {
  return (
    <div className="py-10">
      <h1 className="text-xl font-bold mb-4">혜택 리스트</h1>
      <BenefitList />
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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
