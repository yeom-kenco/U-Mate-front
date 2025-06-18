// src/context/ToastContext.tsx
import React, { createContext, ReactNode } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
// toast 타입 정의에 "custom" 추가
type ToastType = 'default' | 'success' | 'error' | 'info' | 'custom';

interface ToastContextType {
  showToast: (msg: string, type?: ToastType) => void;
}

// context 객체 생성
export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (msg: string, type: ToastType = 'default') => {
    switch (type) {
      case 'success':
        toast.success(msg, {
          icon: (
            <div className="ml-2 bg-white text-blue-500 rounded-full w-5 h-5 flex items-center justify-center ">
              <FaCheck className="w-5 h-3" />
            </div>
          ),
          className:
            'bg-blue-500 text-white text-s  rounded  max-w-[60%] mx-auto itmes-center shadow flex gap-2  gap-4 ',
        });
        break;
      case 'error':
        toast.error(msg, {
          icon: (
            <div className="ml-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              <MdErrorOutline className="w-6 h-6" />
            </div>
          ),
          className:
            'bg-red-500 text-white text-s  rounded  max-w-[60%] mx-auto shadow flex items-center  gap-2  ',
        });
        break;
      case 'info':
        toast.info(msg, {
          className:
            'bg-green-500 text-white  text-s  rounded max-h-[10px] max-w-[60%] mx-auto shadow  flex items-center justify-center  ',
        });
        break;
      case 'custom':
        toast(msg, {
          className:
            'bg-violet-900 text-white text-s  rounded max-h-[10px] max-w-[60%] mx-auto shadow text-center flex items-center justify-center ',
        });
        break;
      default:
        toast(msg);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        closeButton={false}
        theme={undefined}
        pauseOnHover
        draggable={false}
        newestOnTop={true}
      />
    </ToastContext.Provider>
  );
};
