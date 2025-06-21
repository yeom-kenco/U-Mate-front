import BaseModal from './BaseModal';
import Button from '../Button';
import { IoCloseOutline } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';

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
      <div className="flex flex-col h-[60vh]">
        {/* 닫기 버튼 */}
        <div className="flex justify-end pt-4 pr-4 shrink-0">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>

        {type === 'reviewList' && (
          <>
            <h2 className="text-m font-bold text-center mb-2 shrink-0">내가 작성한 리뷰</h2>
            <div className="overflow-y-auto scrollbar-hide px-6 space-y-4 flex-1 pb-4 items-center">
              {children}
            </div>
          </>
        )}

        {type === 'reviewWrite' && (
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-m font-bold text-center mb-2 shrink-0">리뷰 작성</h2>

              {/* 요금제 정보 박스 */}
              <div className="border border-zinc-200 mb-2 rounded-xl p-4 text-s flex justify-between text-black items-center">
                <p className="font-bold text-m">{planName ?? '요금제 이름'}</p>
                <p>{planPrice ?? '가격 정보 없음'}</p>
              </div>

              {/* 별점 박스 */}
              <div>
                <h3 className="text-sm mt-6 mb-1">이 요금제에 대해 얼마나 만족하시나요?</h3>
                <div className="border border-zinc-200 mb-6 rounded-xl p-3 text-s flex justify-center text-black items-center">
                  {[...Array(rating ?? 5)].map((_, i) => (
                    <AiFillStar key={i} className="text-zinc-200 text-m" />
                  ))}
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 mt-6">
              <Button variant="fill" color="gray" size="lg" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button variant="fill" color="pink" size="lg" onClick={onConfirm} className="flex-1">
                작성하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
