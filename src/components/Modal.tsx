import { createPortal } from 'react-dom';
import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Button from './Button';

type ModalProps = {
  size?: 's' | 'm';
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  leftButtonText?: string;
  rightButtonText?: string;
  closeOnOutsideClick?: boolean; // 외부 클릭 시 닫기 여부
};

const SIZE_CLASSES: Record<NonNullable<ModalProps['size']>, string> = {
  s: 'w-[85%] max-w-sm px-5 py-7',
  m: 'w-[95%] max-w-sm p-6',
};

const Modal = ({
  size = 's',
  title = '정말 삭제하시겠습니까?',
  subtitle = '삭제한 리뷰는 다시 되돌릴 수 없어요. 🥲',
  children,
  onClose,
  onConfirm,
  leftButtonText = '취소',
  rightButtonText,
  closeOnOutsideClick = true, // 기본값: 외부 클릭 시 닫힘
}: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8);
    return () => clearTimeout(timer);
  }, []);

  if (!modalRoot) return null;

  const shouldRenderButtons = leftButtonText || rightButtonText;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={closeOnOutsideClick ? onClose : undefined} // 외부 클릭 감지
    >
      <div
        className={`bg-white rounded-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${SIZE_CLASSES[size]}`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫기 방지
      >
        {/* X 버튼: s 사이즈는 제외 */}
        {size !== 's' && (
          <div className="flex justify-end mr-[-6px] mb-2">
            <button onClick={onClose} aria-label="닫기">
              <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
            </button>
          </div>
        )}

        {/* 헤더 */}
        <div className="text-center mb-5">
          <h2 className="text-m font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
        </div>

        {/* 콘텐츠 */}
        <div className={children ? 'max-h-[50vh] overflow-y-auto scrollbar-hide' : ''}>
          {children}
        </div>

        {/* 버튼 영역 */}
        {shouldRenderButtons && (
          <div className="flex gap-2 mt-6 justify-center">
            {leftButtonText && (
              <Button size="m" variant="outline" color="gray" onClick={onClose} className="flex-1">
                {leftButtonText}
              </Button>
            )}
            {rightButtonText && (
              <Button size="m" variant="fill" color="pink" onClick={onConfirm} className="flex-1">
                {rightButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
