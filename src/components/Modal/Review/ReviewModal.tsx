import BaseModal from '../BaseModal';
import { IoCloseOutline } from 'react-icons/io5';
import ReviewListContent from './ReviewListContent';
import ReviewWriteContent from './ReviewWriteContent';
import { useEffect, useState } from 'react';

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
  type: 'reviewList' | 'reviewWrite' | 'reviewEdit';
  onClose: () => void;
  children: React.ReactNode;
  rating?: number;
  planName?: string;
  planPrice?: number;
  initialContent?: string;
  initialRating?: number;
  reviewId?: number;
};

const ReviewModal = ({
  type,
  onClose,
  children,
  planName,
  planPrice,
  initialContent,
  initialRating,
  reviewId,
}: ReviewModalProps) => {
  const [content, setContent] = useState(initialContent ?? '');
  const [rating, setRating] = useState(initialRating ?? 0);

  console.log(reviewId);
  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col h-[70vh] max-h-[520px]">
        <div className="flex justify-end pt-4 pr-5 shrink-0">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>

        {type === 'reviewList' && <ReviewListContent>{children}</ReviewListContent>}

        {(type === 'reviewWrite' || type === 'reviewEdit') && (
          <ReviewWriteContent
            planName={planName}
            planPrice={planPrice}
            onClose={onClose}
            content={content}
            setContent={setContent}
            rating={rating}
            setRating={setRating}
            reviewId={reviewId}
            isEdit={type === 'reviewEdit'}
          >
            {children}
          </ReviewWriteContent>
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
