import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type BaseModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
  className?: string;
};

const BaseModal = ({
  children,
  onClose,
  closeOnOutsideClick = true,
  className = '',
}: BaseModalProps) => {
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
      className={`fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      <div
        className={`bg-white rounded-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] w-[90%] max-w-md max-h-[70vh] transition-transform duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default BaseModal;
