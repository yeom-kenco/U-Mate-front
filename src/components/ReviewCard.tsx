import { AiFillStar } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { deleteReview, updateReview } from '../apis/ReviewApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { closeModal, openModal } from '../store/modalSlice';
import ConfirmModal from './Modal/ConfirmModal';

interface ReviewCardProps {
  reviewId: number;
  isMyPage?: boolean;
  writerName?: string;
  writerAge?: string;
  planName?: string;
  planPrice?: number;
  content: string;
  date: string;
  rating: number;
  onDelete?: () => void;
  onRefresh?: () => void;
}

const ReviewCard = ({
  isMyPage = false,
  reviewId,
  writerName,
  writerAge,
  planName,
  planPrice,
  content,
  date,
  rating,
  onDelete,
  onRefresh,
}: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating] = useState(rating);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  console.log(reviewId, editedContent, editedContent);
  const handleSubmit = async () => {
    try {
      await updateReview({
        reviewId,
        rating: editedRating,
        review: editedContent,
      });
      setIsEditing(false);
      //onRefresh?.();
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
    }
  };

  const handledeleteReview = async () => {
    try {
      const res = await deleteReview({ reviewId });
      console.log(res);
      //onRefresh?.();
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };
  return (
    <div className="rounded-[20px] bg-white shadow-card overflow-hidden w-[332px] h-[197px] flex max-[390px]:w-[300px] flex-col">
      {/* 상단 */}
      <div className="bg-primary text-white px-5 py-3 flex justify-between items-center text-m font-bold">
        {isMyPage ? (
          <span>{planName}</span>
        ) : (
          <>
            <span>
              {writerName?.slice(0, 1)} * {writerName?.slice(-1)}
            </span>
            <span>{writerAge}</span>
          </>
        )}
      </div>

      {/* 내용 */}
      <div className="pl-5 pr-5 pt-3 pb-1 text-gray-700 text-s relative flex-1 flex items-center">
        <div className="w-full">
          <img src="/images/double-quotes.png" className="mb-2" />
          {isEditing ? (
            <textarea
              className="w-full border rounded p-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>

      {/* 하단 */}
      <div className="px-5 pt-1 pb-2">
        <div className="h-[0.5px] bg-zinc-200 mb-2" />
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span className="!font-light">{date}</span>
          <div className="flex items-center gap-1">
            {isMyPage && (
              <>
                {isEditing ? (
                  <>
                    <button onClick={handleSubmit} className="text-blue-600 text-sm font-bold mr-2">
                      저장
                    </button>
                    <button onClick={() => setIsEditing(false)} className="text-zinc-500 text-sm">
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)}>
                      <FiEdit className="text-violet-300 text-lm mr-2 hover:text-violet-500" />
                    </button>
                    <button onClick={() => setIsOpen(true)}>
                      <FiTrash2 className="text-violet-300 text-lm mr-2 hover:text-violet-500" />
                    </button>
                  </>
                )}
              </>
            )}
            <AiFillStar className="text-yellow-400 text-sm" />
            {isEditing ? (
              <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                value={editedRating}
                onChange={(e) => setEditedRating(parseFloat(e.target.value))}
                className="w-[50px] border-b border-gray-300 text-center text-sm"
              />
            ) : (
              <span className="font-normal text-sm">{rating}</span>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          onClose={() => dispatch(closeModal())}
          title="정말 삭제하시겠습니까?"
          subtitle="삭제한 리뷰는 되돌릴 수 없어요."
          onConfirm={handledeleteReview}
          cancelText="취소"
          confirmText="삭제"
        />
      )}
    </div>
  );
};

export default ReviewCard;
