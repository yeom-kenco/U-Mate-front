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
  closeOnOutsideClick?: boolean;
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<ModalProps['size']>, string> = {
  s: 'w-[85%] max-w-md px-5 py-7',
  m: 'w-[95%] max-w-md p-6',
};

const Modal = ({
  size = 's',
  title = '',
  subtitle = '',
  children,
  onClose,
  onConfirm,
  leftButtonText = '취소',
  rightButtonText,
  closeOnOutsideClick = true,
  className = '',
}: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 8);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!modalRoot) return null;

  const shouldRenderButtons = leftButtonText || rightButtonText;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      <div
        className={`bg-white rounded-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex flex-col ${SIZE_CLASSES[size]} ${className} transition-all duration-300 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        {size !== 's' && (
          <div className="flex justify-end pt-4 pr-4">
            <button onClick={onClose} aria-label="닫기">
              <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
            </button>
          </div>
        )}

        {/* 헤더 */}
        {(title || subtitle) && (
          <div className="text-center px-6 mb-4">
            {title && <h2 className="text-m font-bold">{title}</h2>}
            {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide">{children}</div>

        {/* 버튼 영역 */}
        {shouldRenderButtons && (
          <div className="flex gap-2 px-6 py-4">
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
