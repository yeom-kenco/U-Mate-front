import { createHashRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';

const router = createHashRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <div>메인</div>,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
