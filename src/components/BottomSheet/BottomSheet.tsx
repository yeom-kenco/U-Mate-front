import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SlArrowDown } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';

interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  height?: string;
  alignRight?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  height,
  alignRight,
}) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isChatbotPage = location.pathname.includes('/chatbot');

  // 트랜지션 처리를 위한 mount 제어
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      // 애니메이션 후 언마운트
      const timer = setTimeout(() => setVisible(false), 300); // transition duration과 일치
      document.body.style.overflow = 'auto';
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[100] flex items-end justify-center ',
        alignRight && 'justify-end'
      )}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          'absolute inset-0 bg-black transition-opacity duration-300',
          isOpen ? 'opacity-30' : 'opacity-0'
        )}
        onClick={onClose} // 뒷배경 누르면 닫히도록
      />

      {/* Bottom Sheet */}
      <div
        className={clsx(
          'relative bg-white z-[9999] rounded-t-[20px]  shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500',
          isChatbotPage ? 'w-full md:w-[50%] md:ml-auto md:mr-0' : 'w-full',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ height }}
      >
        {/* Handle */}
        <div className="pt-3 pb-[15px] flex justify-center items-center" onClick={onClose}>
          <SlArrowDown className="size-5 text-zinc-400" />
        </div>

        {/* Content */}
        <div
          className={clsx(
            `overflow-y-hidden px-2 pb-8 scrollbar-hidden `,
            height === '700px' && 'overflow-y-scroll'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
