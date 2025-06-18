import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router/index.tsx';
import './index.css';
import { store } from './store/store.ts';
import Default from './default.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={store}>
      <Router />
    </Provider> */}
    <Default />
  </StrictMode>
);
