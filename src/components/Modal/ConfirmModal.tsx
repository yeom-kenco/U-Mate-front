import BaseModal from './BaseModal';
import Button from '../Button';

type ConfirmModalProps = {
  title: string;
  subtitle?: string;
  onClose: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
};

const ConfirmModal = ({
  title,
  subtitle,
  onClose,
  onConfirm,
  cancelText = '취소',
  confirmText = '변경하기',
  children,
}: ConfirmModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="p-6 sm:p-8">
        <h2 className="text-m font-bold text-center max-[350px]:text-sm">{title}</h2>
        <p className="text-sm text-zinc-400 text-center mt-2 max-[350px]:text-s">{subtitle}</p>
        {children && <div className="mt-4">{children}</div>}
        <div className="flex gap-2 mt-5">
          <Button variant="fill" color="gray" size="lg" onClick={onClose} className="flex-1">
            {cancelText}
          </Button>
          <Button variant="fill" color="pink" size="lg" onClick={onConfirm} className="flex-1">
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
