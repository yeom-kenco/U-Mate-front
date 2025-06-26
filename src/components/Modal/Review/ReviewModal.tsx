import BaseModal from '../BaseModal';
import { IoCloseOutline } from 'react-icons/io5';
import ReviewListContent from './ReviewListContent';
import ReviewWriteContent from './ReviewWriteContent';
import AllReviewListContent from './AllReviewListContent';
import { useState } from 'react';

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
  type: 'reviewList' | 'reviewWrite' | 'allReviewList' | 'reviewEdit';
  onClose: () => void;
  children?: React.ReactNode;
  rating?: number;
  planName?: string;
  reviews?: any[];
  planPrice?: number;
  initialContent?: string;
  initialRating?: number;
};

const ReviewModal = ({
  type,
  onClose,
  children,
  planName,
  planPrice,
  reviews,
  initialContent,
  initialRating,
}: ReviewModalProps) => {
  const [content, setContent] = useState(initialContent ?? '');
  const [rating, setRating] = useState(initialRating ?? 0);

  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col h-[70vh] max-h-[520px]">
        <div className="flex justify-end pt-4 pr-5 shrink-0">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>

        {type === 'reviewList' && <ReviewListContent />}
        {type === 'allReviewList' && <AllReviewListContent reviews={reviews ?? []} />}
        {(type === 'reviewWrite' || type === 'reviewEdit') && (
          <ReviewWriteContent
            planName={planName}
            planPrice={planPrice}
            onClose={onClose}
            content={content}
            setContent={setContent}
            rating={rating}
            setRating={setRating}
          >
            {children}
          </ReviewWriteContent>
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
