import React, { useEffect, useState } from 'react';
import clsx from 'clsx'; // Tailwind 조건부 클래스용 유틸 (선택)
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';

interface PlanBottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  heightClass?: string; // height → heightClass로 변경: tailwind 클래스 받을 수 있도록 하기 위함
}

const PlanBottomSheet: React.FC<PlanBottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  onOpen,
  heightClass = '50%',
}) => {
  return (
    <div className="fixed inset-0 z-[55] flex justify-center items-end pointer-events-none">
      {/* Backdrop */}
      <div
        className={clsx(
          'absolute inset-0 bg-black transition-opacity duration-300',
          isOpen ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={clsx(
          'relative w-full max-w-screen bg-white dark:bg-neutral-900 rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500 pointer-events-auto',
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-40px)]',
          heightClass
        )}
      >
        {/* Handle 영역 */}
        <div
          className="pt-3 pb-[15px] flex justify-center items-center cursor-pointer"
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? (
            <SlArrowDown className="size-5 text-gray-500" />
          ) : (
            <SlArrowUp className="size-5 text-gray-500" />
          )}
        </div>

        {/* 내용 */}
        <div
          className={clsx(
            'flex-1 overflow-y-hidden px-[18px] pb-[34px] flex flex-col gap-7 scrollbar-hidden'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlanBottomSheet;
