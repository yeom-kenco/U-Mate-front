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
import LoginBanner from '../components/LoginBanner';
import Modal from '../components/Modal';
import { HeaderProps } from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import { useContext, useEffect } from 'react';
import { ToastContext } from '../context/ToastContext';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
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

  const toastContext = useContext(ToastContext);

  const handleClick = () => {
    toastContext?.showToast('리뷰가 삭제되었습니다!', 'black');
  };

  // 모달 테스트
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const isOpen = useAppSelector((state) => state.modal.isOpen);

  return (
    <div className="py-10">
      <BenefitDropBar label="할인 혜택" indexes={[0, 1, 2, 3, 4]} data={benefitList} />
      <BenefitDropBar label="기본 혜택" indexes={[5, 6, 7, 8, 9]} data={benefitList} />

      <Button variant="outline" color="gray" size="s">
        outline
      </Button>
      {/* 최대 글자수일때&요금제상세페이지 UI 테스트 */}
      <ReviewCard
        writerName="김석"
        writerAge="20대"
        content="이 서비스는 정말 유용하고 직관적이에요. 디자인도 깔끔하고 사용법도 쉬워서 만족스럽습니다. 이 서비스는 정말 유용하고 직관적이에요. 디자인도 깔끔하고 사용법도 쉬워서 만족스러워요."
        date="25.06.11"
        rating={5}
      />
      <div className="mb-4"></div>
      {/* 글자수 적을때&마이페이지 UI 테스트 */}
      <ReviewCard
        isMyPage
        planName="5G 프리미어 에센셜"
        content="유메이트 화이팅! 우아아앙"
        date="25.06.11"
        rating={5}
        onEdit={() => console.log('수정')}
        onDelete={() => console.log('삭제')}
      />

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

      <Button onClick={() => dispatch(openModal())}>모달</Button>
      {isOpen && (
        <Modal
          leftButtonText="아니오"
          rightButtonText="네"
          onClose={handleClose} // 모달 닫기 테스트
          onConfirm={() => {
            console.log('삭제');
            dispatch(closeModal());
          }} // 버튼 확인 테스트용
        ></Modal>
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
