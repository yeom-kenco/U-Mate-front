// router/index.tsx
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import LoginBanner from '../components/Loginbanner';

// Footer 테스트용 임시 페이지
const TempPage = () => (
  <div>
    <LoginBanner message="로그인하고 고객님만을 위한 대화를 시작해보세요" />
    <LoginBanner message="로그인하고 현재 가입조건을 이용하세요" />
  </div>
);

const router = createHashRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <TempPage />, // ✅ Outlet 채우기
      },
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
