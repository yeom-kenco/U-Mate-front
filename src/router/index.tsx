import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import BenefitDropBar from '../components/BenefitDropBar';
import { benefitList } from '../data/benefits';
import PricingPage from '../pages/PricingPage';
import Modal from '../components/Modal';
import Button from '../components/Button';

// 테스트용 임시 페이지
const TempPage = () => {
  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />
      <Modal
        title="정말로 삭제하시겠습니까?"
        subtitle="삭제한 리뷰는 다시 되돌릴 수 없어요. 🥲"
        size="m"
        showButtons
        leftButtonText="취소"
        rightButtonText="삭제하기"
        onClose={() => console.log('닫기')}
        onConfirm={() => console.log('삭제')}
      ></Modal>
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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
