import BaseModal from './BaseModal';
import Button from '../Button';
import { IoCloseOutline } from 'react-icons/io5';
import ReviewTextarea from '../ReviewTextarea';

type ReviewModalProps = {
  type: 'reviewList' | 'reviewWrite';
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

const ReviewModal = ({ type, onClose, onConfirm, children }: ReviewModalProps) => {
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
              <div className="border border-zinc-200 mb-2 rounded-xl p-4 text-s flex justify-between text-black items-center">
                <p className="font-bold">5G 에센셜 프리미엄</p>
                <p>월 85,000원</p>
              </div>
              <div>
                <h3 className="text-sm mt-6 mb-1">이 요금제에 대해 얼마나 만족하시나요?</h3>
                <div className="border border-zinc-200 mb-6 rounded-xl p-3 text-s flex justify-center text-black items-center">
                  <p>⭐⭐⭐⭐⭐</p>
                </div>
                <ReviewTextarea />
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
        )}
      </div>
    </BaseModal>
  );
};

export default ReviewModal;
