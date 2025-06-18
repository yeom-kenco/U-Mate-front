// router/index.tsx
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import TermsOfUsePage from '../pages/TermsOfUsePage';

// Footer 테스트용 임시 페이지
const TempPage = () => <div>Footer 테스트용 페이지입니다</div>;

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
