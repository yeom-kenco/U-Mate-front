import { createContext, ReactNode } from 'react';
import { Slide, toast, ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'violet' | 'black';

interface ToastContextType {
  showToast: (
    msg: string,
    type?: ToastType,
    position?: ToastPosition,
    style?: React.CSSProperties
  ) => void;
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

  const showToast = (
    msg: string,
    type: ToastType = 'error',
    position: ToastPosition = 'bottom-center',
    style?: React.CSSProperties
  ) => {
    toast(msg, {
      className: toastStyles[type],
      position,
      style, // 👈 사용자 지정 style 주입, 위치 미세 조정, 색상 조정 가능 (e.g. {bottom:"100px"} 이렇게 넘겨주면 됨)
      icon: false,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        autoClose={1000}
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
