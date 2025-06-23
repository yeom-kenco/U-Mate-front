import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { FocusTrap } from 'focus-trap-react';

type BaseModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
  className?: string;
  labelledBy?: string;
};

const BaseModal = ({
  children,
  onClose,
  closeOnOutsideClick = true,
  className = '',
  labelledBy,
}: BaseModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 8);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={`fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      <FocusTrap>
        <div
          className={`bg-white rounded-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] w-[90%] max-w-md max-h-[70vh] transition-transform duration-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          } ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusTrap>
      ,
    </div>,
    modalRoot
  );
};

export default BaseModal;
