import BaseModal from '../BaseModal';
import { IoCloseOutline } from 'react-icons/io5';
import ReviewListContent from './ReviewListContent';
import ReviewWriteContent from './ReviewWriteContent';

type ReviewModalProps = {
  type: 'reviewList' | 'reviewWrite';
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  rating?: number;
  planName?: string;
  planPrice?: string;
};

const ReviewModal = ({
  type,
  onClose,
  onConfirm,
  children,
  rating,
  planName,
  planPrice,
}: ReviewModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col h-[70vh] max-h-[500px]">
        <div className="flex justify-end pt-4 pr-4 shrink-0">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>

        {type === 'reviewList' && <ReviewListContent>{children}</ReviewListContent>}

        {type === 'reviewWrite' && (
          <ReviewWriteContent
            rating={rating}
            planName={planName}
            planPrice={planPrice}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
