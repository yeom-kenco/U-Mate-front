import { createHashRouter, RouterProvider } from 'react-router-dom';
import Default from '../default';

const router = createHashRouter([
  {
    element: <Default />,
    children: [{}],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
