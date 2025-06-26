import { AiFillStar } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { deleteReview, updateReview } from '../apis/ReviewApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import ConfirmModal from './Modal/ConfirmModal';
import { useToast } from '../hooks/useToast';
import StarRating from './StartRating';

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
  const { showToast } = useToast();
  const handleUpdateReview = async () => {
    try {
      const res = await updateReview({
        reviewId,
        rating: editedRating,
        review: editedContent,
      });
      showToast(res.message, 'success');
      setIsEditing(false);
      onRefresh?.();
    } catch (error) {
      if (editedContent.length < 10) showToast('10자 이상 적어주세요.', 'error');
      else showToast(error.response.data.error, 'error');
    }
  };

  const handleDeleteReview = async () => {
    try {
      const res = await deleteReview({ reviewId });
      showToast(res.message, 'success');
      onRefresh?.();
    } catch (error) {
      showToast(error.response.data.error, 'error');
    }
  };
  return (
    // ReviewCard.tsx

    <div className="select-none rounded-[20px] bg-white shadow-card overflow-hidden w-[332px] h-[197px] flex max-[390px]:w-[300px] flex-col flex-shrink-0">
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
              minLength={10}
              maxLength={100}
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
                    <button
                      onClick={handleUpdateReview}
                      className="text-pink-500 text-sm font-bold mr-2"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setEditedRating(rating);
                        setEditedContent(content);
                        setIsEditing(false);
                      }}
                      className="text-zinc-500 text-sm"
                    >
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

            {isEditing ? (
              <StarRating value={editedRating} onChange={setEditedRating} className="w-4 h-4" />
            ) : (
              <>
                <AiFillStar className="text-yellow-400 text-sm" />
                <span className="font-normal text-sm">{rating}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          onClose={() => setIsOpen(false)}
          title="정말 삭제하시겠습니까?"
          subtitle="삭제한 리뷰는 되돌릴 수 없어요."
          onConfirm={handleDeleteReview}
          cancelText="취소"
          confirmText="삭제"
        />
      )}
    </div>
  );
};

export default ReviewCard;
