import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router';
import './index.css';
import { store } from './store/store';
import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastProvider>
      <Router />
    </ToastProvider>
  </Provider>
);
