import BaseModal from '../BaseModal';
import { IoCloseOutline } from 'react-icons/io5';
import ReviewListContent from './ReviewListContent';
import ReviewWriteContent from './ReviewWriteContent';

// 리뷰 작성 모달 사용 예시
// {isOpen && (
//   <ReviewModal
//     type="reviewWrite"
//     ....
//   ></ReviewModal>
// )}

// 리뷰 조회 모달 사용 예시
// {isOpen && (
//   <ReviewModal
//     type="reviewList"
//   ><ReviewCard ../></ReviewModal>
// )}

type ReviewModalProps = {
  type: 'reviewList' | 'reviewWrite';
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  rating?: number;
  planName?: string;
  planPrice?: number;
  question?: string;
};

const ReviewModal = ({
  type,
  onClose,
  onConfirm,
  children,
  planName,
  planPrice,
  question,
}: ReviewModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col h-[70vh] max-h-[520px]">
        <div className="flex justify-end pt-4 pr-5 shrink-0">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>

        {type === 'reviewList' && <ReviewListContent>{children}</ReviewListContent>}

        {type === 'reviewWrite' && (
          <ReviewWriteContent
            planName={planName}
            planPrice={planPrice}
            onClose={onClose}
            question={question}
          />
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
