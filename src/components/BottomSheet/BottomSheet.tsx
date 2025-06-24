import React, { useEffect, useState } from 'react';
import clsx from 'clsx'; // Tailwind 조건부 클래스용 유틸 (선택)
import { SlArrowDown } from 'react-icons/sl';
interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  height?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, isOpen, onClose, height = '50%' }) => {
  const [visible, setVisible] = useState(false);

  // 트랜지션 처리를 위한 mount 제어
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // 애니메이션 후 언마운트
      const timer = setTimeout(() => setVisible(false), 300); // transition duration과 일치
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-end ">
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
          ' relative w-full max-w-screen bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ height }} // 받아온 height로 높이 bottomSheet 높이 지정
      >
        {/* Handle */}
        <div className="pt-3 pb-[15px] flex justify-center items-center">
          <SlArrowDown className="size-5  text-gray-500 " />
        </div>

        {/* Content */}
        <div
          className={clsx(
            `flex-1 overflow-y-hidden px-[18px]  pb-[34px] flex flex-col gap-7 scrollbar-hidden `,
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
