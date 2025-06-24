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
import ReviewTextarea from '../components/ReviewTextarea';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SolutionList from '../components/BottomSheet/solutionList';
import ShortcutPage from '../pages/ShortcutPage';

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
        <ReviewModal
          type="reviewWrite"
          onClose={handleClose} // 모달 닫기 테스트
        ></ReviewModal>
      )}
      <button onClick={() => setPlanOpen(true)}>열기</button>
      <BottomSheet isOpen={planopen} onClose={() => setPlanOpen(false)} height="400px">
        <SolutionList onSelect={handlePlanSelect} selected={isPlan} />
      </BottomSheet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/test',
        element: <TempPage />, // ✅ 테스트용 페이지 라우터 재정의
      },
      { path: 'chatbot', element: <ChatbotMain /> },
      {
        path: '/terms',
        element: <TermsOfUsePage />,
      },
      { path: 'pricing', element: <PricingPage /> }, // 요금제 페이지
      { path: '/login', element: <LoginPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/signup', element: <RegisterPage /> },
    ],
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
