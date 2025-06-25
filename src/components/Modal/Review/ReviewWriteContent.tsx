import Button from '../../Button';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ReviewTextarea from '../../ReviewTextarea';
import { createReview, updateReview } from '../../../apis/ReviewApi';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import ConfirmModal from '../ConfirmModal';
import { closeModal } from '../../../store/modalSlice';
import StarRating from '../../StartRating';
import { useAppSelector } from '../../../hooks/reduxHooks';

type ReviewWriteContentProps = {
  planName?: string;
  planPrice?: number;
  question?: string;
  onClose: () => void;
  content: string;
  setContent: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
};

const ReviewWriteContent = ({ planName, planPrice, onClose, rating }: ReviewWriteContentProps) => {
  const user = useAppSelector((state) => state.user);
  const [content, setContent] = useState('');
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isCancle, setIsCancle] = useState(false);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const handleCreateOrUpdateReview = async () => {
    try {
      const res = await createReview({
        userId: user?.id,
        planId: user?.plan,
        rating: ratingValue,
        review: content,
      });
      showToast(res.message, 'success');
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 flex flex-col min-h-0">
      <h2 className="text-m font-bold text-center mb-4 shrink-0 md:text-lm">리뷰 작성</h2>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="border border-zinc-200 mb-2 rounded-xl p-4 text-s flex justify-between text-black items-center">
          <p className="mt-1 font-bold text-sm max-[370px]:text-s">
            {planName ?? '요금제 정보 없음'}
          </p>
          <p className="mt-1 text-sm max-[370px]:text-s">
            {planPrice != null ? `월 ${planPrice.toLocaleString()}원` : '가격 정보 없음'}
          </p>
        </div>

        <div>
          <h3 className="text-m mt-6 mb-1 max-[370px]:text-s pl-2">
            이 요금제에 대해 얼마나 만족하시나요?
          </h3>
          <div className="border border-zinc-200 mb-2 rounded-xl p-3 text-s flex justify-center text-black items-center">
            <StarRating value={ratingValue} onChange={setRatingValue} />
          </div>
        </div>

        <ReviewTextarea width="w-full" value={content} onChange={setContent} />

        <div className="flex gap-2 mt-6">
          <Button
            variant="fill"
            color="gray"
            size="lg"
            onClick={() => {
              if (content.length > 3) {
                setIsCancle(true); // 확인 모달 띄우기
              } else {
                onClose(); // 바로 닫기
              }
            }}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            variant="fill"
            color="pink"
            size="lg"
            onClick={handleCreateOrUpdateReview}
            className="flex-1"
          >
            작성하기
          </Button>
        </div>
      </div>
      {isCancle && (
        <ConfirmModal
          onConfirm={() => {
            dispatch(closeModal()); //모든 모달 닫기
          }}
          onClose={() => {
            setIsCancle(false); // 확인 모달만 닫음 (리뷰 작성 모달 유지)
          }}
          title="앗! 지금 작성 중인 내용이 있어요"
          subtitle="지금 나가면 작성한 내용이 모두 지워져요 😢"
          cancelText="취소"
          confirmText="닫기"
        />
      )}
    </div>
  );
};

export default ReviewWriteContent;
