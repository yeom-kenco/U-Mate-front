// router/index.tsx
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';
import ChatbotMain from '../pages/ChatbotMain';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import Button from '../components/Button';

// Footer 테스트용 임시 페이지
const TempPage = () => (
  <div>
    <Button variant="outline" color="gray" size="s">
      outline
    </Button>
    <Button variant="outline" color="pink" size="m">
      outline
    </Button>
    <Button variant="outline" color="violet" size="lg">
      outline
    </Button>
    <Button variant="outline" color="pink" size="xl">
      outline
    </Button>
    <br />
    <br />
    <Button variant="fill" color="pink" size="s">
      fill
    </Button>
    <Button variant="fill" color="violet" size="m">
      fill
    </Button>
    <Button variant="fill" color="gray" size="lg">
      fill
    </Button>
    <Button variant="fill" color="pink" size="xl">
      fill
    </Button>
    <br />
    <br />
    <Button variant="ghost" color="pink" size="s">
      ghost
    </Button>
    <Button variant="ghost" color="gray" size="m">
      ghost
    </Button>
    <Button variant="ghost" color="violet" size="lg">
      ghost
    </Button>
    <Button variant="ghost" color="black" size="xl">
      ghost
    </Button>
    <br />
    <br />
    <Button variant="special" size="lg">
      고객센터 전화걸기
    </Button>
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
