import Button from '../../Button';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ReviewTextarea from '../../ReviewTextarea';
import { createReview } from '../../../apis/ReviewApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';

type ReviewWriteContentProps = {
  planName?: string;
  planPrice?: number;
  question?: string;
  onClose: () => void;
};

const ReviewWriteContent = ({
  planName,
  planPrice,
  onClose,
  question,
}: ReviewWriteContentProps) => {
  const user = useSelector((state) => state.user);

  const [content, setContent] = useState('');
  const [ratingValue, setRatingValue] = useState<number>(0);

  const handlecreatReview = async () => {
    try {
      await createReview({
        userId: user?.id,
        planId: user?.plan,
        rating: ratingValue,
        review: content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = isHalf ? index + 0.5 : index + 1;
    setRatingValue(newRating);
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
          <h3 className="text-sm mt-6 mb-1 max-[370px]:text-s">
            {question ? question : '이 요금제에 대해 얼마나 만족하시나요?'}
          </h3>
          <div className="border border-zinc-200 mb-2 rounded-xl p-3 text-s flex justify-center text-black items-center">
            <div className="flex space-x-1">
              {/*별(레이팅) */}
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="relative w-6 h-6 cursor-pointer">
                  {/* 클릭 영역 */}
                  <div
                    className="absolute left-0 w-1/2 h-full z-10"
                    onClick={() => handleClick(index, true)}
                  />
                  <div
                    className="absolute right-0 w-1/2 h-full z-10"
                    onClick={() => handleClick(index, false)}
                  />

                  {/* 배경 별 */}
                  <AiOutlineStar className="w-full h-full text-yellow-300" />

                  {/* 반 별 또는 전체 별 */}
                  {ratingValue >= index + 1 ? (
                    <AiFillStar className="absolute top-0 left-0 w-full h-full text-yellow-400" />
                  ) : ratingValue >= index + 0.5 ? (
                    <AiFillStar
                      className="absolute top-0 left-0 w-full h-full text-yellow-400"
                      style={{ clipPath: 'inset(0 50% 0 0)' }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <ReviewTextarea width="w-full" value={content} onChange={setContent} />

        <div className="flex gap-2 mt-6">
          <Button variant="fill" color="gray" size="lg" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button
            variant="fill"
            color="pink"
            size="lg"
            onClick={handlecreatReview}
            className="flex-1"
          >
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWriteContent;
