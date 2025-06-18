import { createPortal } from 'react-dom';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Button from './Button';

type ModalProps = {
  size?: 's' | 'm' | 'lg';
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  showButtons?: boolean; // 버튼 표시 여부
  leftButtonText?: string; // 왼쪽 버튼 텍스트
  rightButtonText?: string; // 오른쪽 버튼 텍스트
};

const SIZE_CLASSES: Record<NonNullable<ModalProps['size']>, string> = {
  s: 'w-[85%] max-w-sm px-5 py-7',
  m: 'w-[95%] max-w-sm p-6',
  lg: 'w-[95%] max-w-xl pt-9 px-5 pb-8',
};

const Modal = ({
  size = 'm',
  title,
  subtitle,
  children,
  onClose,
  onConfirm,
  leftButtonText = '',
  rightButtonText = '',
  showButtons = false,
}: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const shouldRenderButtons = showButtons && (leftButtonText || rightButtonText);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className={`bg-white rounded-2xl shadow-lg w-full ${SIZE_CLASSES[size]}`}>
        {/* X 버튼: s 사이즈에는 렌더링하지 않음 */}
        {size !== 's' && (
          <div className="flex justify-end mb-2">
            <button onClick={onClose} aria-label="닫기">
              <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-m font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
        </div>

        {/* Content */}
        <div>{children}</div>

        {/* Footer Buttons */}
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
