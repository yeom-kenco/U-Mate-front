import Button from '../../Button';
import { AiFillStar } from 'react-icons/ai';

type ReviewWriteContentProps = {
  rating?: number;
  planName?: string;
  planPrice?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const ReviewWriteContent = ({
  rating,
  planName,
  planPrice,
  onClose,
  onConfirm,
}: ReviewWriteContentProps) => {
  return (
    <div className="p-6 flex flex-col flex-1 justify-between">
      <div>
        <h2 className="text-m font-bold text-center mb-2 shrink-0">리뷰 작성</h2>

        <div className="border border-zinc-200 mb-2 rounded-xl p-4 text-s flex justify-between text-black items-center">
          <p className="font-bold text-sm">{planName ?? '요금제 이름'}</p>
          <p className="text-sm">{planPrice ?? '가격 정보 없음'}</p>
        </div>

        <div>
          <h3 className="text-sm mt-6 mb-1">이 요금제에 대해 얼마나 만족하시나요?</h3>
          <div className="border border-zinc-200 mb-6 rounded-xl p-3 text-s flex justify-center text-black items-center">
            {[...Array(rating ?? 5)].map((_, i) => (
              <AiFillStar key={i} className="text-zinc-200 text-m" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant="fill" color="gray" size="lg" onClick={onClose} className="flex-1">
          취소
        </Button>
        <Button variant="fill" color="pink" size="lg" onClick={onConfirm} className="flex-1">
          작성하기
        </Button>
      </div>
    </div>
  );
};

export default ReviewWriteContent;
