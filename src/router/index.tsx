import { createBrowserRouter, RouterProvider, useOutletContext } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import BenefitDropBar from '../components/BenefitDropBar';
import { benefitList } from '../data/benefits';
import PricingPage from '../pages/PricingPage';
import Modal from '../components/Modal';
import { HeaderProps } from '../components/Header';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; // store.ts 위치에 맞게 경로 조정
import { openModal, closeModal } from '../store/modalSlice';
import Button from '../components/Button';

// 테스트용 임시 페이지
const TempPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  useEffect(() => {
    setHeaderConfig({
      showBackButton: false,
      showSearch: false,
    });
  }, []);

  // 모달 테스트
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />
      <Button onClick={() => dispatch(openModal())}>모달</Button>
      {isOpen && (
        <Modal
          title="내가 작성한 리뷰"
          subtitle="삭제한 리뷰는 다시 되돌릴 수 없어요. 🥲"
          size="s"
          showButtons
          leftButtonText="취소"
          rightButtonText="삭제하기"
          onClose={handleClose} // 모달 닫기 테스트
          onConfirm={() => {
            console.log('삭제');
            dispatch(closeModal());
          }} // 버튼 확인 테스트용
        >
          {/* <p>
          안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽안뇽
        </p> */}
        </Modal>
      )}
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
