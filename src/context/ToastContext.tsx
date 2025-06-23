// src/context/ToastContext.tsx
import { createContext, ReactNode } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'violet' | 'black';

interface ToastContextType {
  showToast: (msg: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const baseStyle =
    'sm:w-[500px] w-[90%] mx-auto mb-2 text-white text-sm sm:text-m rounded-2xl items-center drop-shadow-lg flex justify-center';

  const toastStyles: Record<ToastType, string> = {
    success: `bg-blue-500 ${baseStyle}`,
    error: `bg-red-500 ${baseStyle}`,
    violet: `bg-violet-900 ${baseStyle}`,
    black: `bg-black/50 backdrop-blur-md ${baseStyle}`,
  };

  const showToast = (msg: string, type: ToastType = 'error') => {
    toast(msg, {
      className: toastStyles[type],
      icon: false,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={true}
        closeOnClick
        draggable
        pauseOnHover
        closeButton={false}
        transition={Slide}
        icon={false}
      />
    </ToastContext.Provider>
  );
};
