import BenefitCard from '../BenefitCard';
import { benefitCards } from '../../data/benefitsCard';
import BaseModal from './BaseModal';
import Button from '../Button';
import { IoCloseOutline } from 'react-icons/io5';

type FilterModalProps = {
  filters: {
    ageGroup?: string;
    minFee?: number;
    maxFee?: number;
    dataType?: string;
    benefitIds?: number[];
  };
  onChange: (newFilters: FilterModalProps['filters']) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
  planCount: number;
};
type ageOptions = { label: string; value?: string };
type FeeRange = { label: string; min?: number; max?: number };

const FilterModal = ({
  filters,
  onChange,
  onClose,
  onApply,
  onReset,
  planCount,
}: FilterModalProps) => {
  // 연령 범위 리스트
  const ageOptions: ageOptions[] = [
    { label: '전체대상', value: '' }, // undefined 보다는 빈 문자열로 통일
    { label: '만65세 이상', value: '만65세 이상' },
    { label: '만34세 이하', value: '만34세 이하' },
    { label: '만18세 이하', value: '만18세 이하' },
    { label: '만12세 이하', value: '만12세 이하' },
  ];
  // 요금범위 리스트
  const feeRanges: FeeRange[] = [
    { label: '~5만원대', min: 0, max: 50000 },
    { label: '6~8만원대', min: 60000, max: 80000 },
    { label: '9만원대~', min: 90000, max: undefined },
    { label: '상관없어요', min: undefined, max: undefined },
  ];
  return (
    <BaseModal
      onClose={onClose}
      className="z-50 rounded-none max-[500px]:min-h-full max-[500px]:min-w-full min-[500px]:rounded-2xl overflow-y-scroll"
    >
      <div className="flex flex-col px-5 pb-6 min-h-0">
        {/* 닫기 버튼 */}
        <div className="flex justify-end pt-4 shrink-0 mb-6">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>
        <h1 className="text-lg font-bold mb-8">어떤 요금제를 찾으시나요?</h1>
        <div className="flex gap-3 mb-4 flex-wrap">
          {/* 연령대 */}
          <h2 className="text-lm font-bold mb-3">연령대</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {ageOptions.map(({ label, value }) => (
              <button
                key={label}
                className={`tag ${
                  filters.ageGroup === value ? 'border-pink-500 border-2' : 'border-zinc-200'
                } rounded-full px-6 py-2 text-m font-semibold border`}
                onClick={() =>
                  onChange({
                    ...filters,
                    ageGroup: value,
                  })
                }
              >
                {label}
              </button>
            ))}
          </div>
          <hr />

          {/* 요금범위 */}
          <h2 className="text-lm font-bold mb-3">요금범위</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {feeRanges.map(({ label, min, max }) => (
              <button
                key={label}
                className={`tag ${
                  filters.minFee === min && filters.maxFee === max
                    ? 'border-pink-500 border-2'
                    : 'border-zinc-200'
                } rounded-full px-6 py-2 text-m font-semibold border`}
                onClick={() =>
                  onChange({
                    ...filters,
                    minFee: min,
                    maxFee: max,
                  })
                }
              >
                {label}
              </button>
            ))}
          </div>
          <hr />

          {/* 데이터 */}
          <h2 className="text-lm font-bold mb-3">데이터</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {['상관없어요', '무제한', '10GB 이상'].map((label) => (
              <button
                key={label}
                className={`tag ${
                  filters.dataType === (label === '상관없어요' ? '' : label)
                    ? 'border-pink-500 border-2'
                    : 'border-zinc-200'
                } rounded-full px-6 py-2 text-m font-semibold border`}
                onClick={() =>
                  onChange({
                    ...filters,
                    dataType: label === '상관없어요' ? '' : label,
                  })
                }
              >
                {label}
              </button>
            ))}
          </div>
          <hr />
          <div className="flex flex-col">
            <h2 className="text-lm font-bold mb-5">혜택</h2>
            <div className="grid grid-cols-3 gap-4">
              {benefitCards.map((card) => {
                const selectedIds = filters.benefitIds || [];
                const isSelected = selectedIds.includes(card.id);

                const handleClick = () => {
                  let updated: number[] = [];

                  if (card.id === 15) {
                    updated = [15];
                  } else {
                    if (selectedIds.includes(15)) {
                      updated = [card.id];
                    } else if (isSelected) {
                      updated = selectedIds.filter((id) => id !== card.id);
                    } else {
                      updated = [...selectedIds, card.id];
                    }
                  }

                  onChange({
                    ...filters,
                    benefitIds: updated,
                  });
                };

                return (
                  <BenefitCard
                    key={card.id}
                    {...card}
                    selected={isSelected}
                    onClick={handleClick}
                  />
                );
              })}
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-8 flex gap-2">
            <Button
              variant="outline"
              size="xl"
              color="gray"
              onClick={() => {
                onReset();
              }}
            >
              초기화
            </Button>
            <Button
              variant="fill"
              color="pink"
              size="xl"
              onClick={() => {
                onApply();
                onClose();
              }}
              disabled={planCount === 0}
              className="flex-1"
            >
              {planCount}개 요금제 보기
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default FilterModal;
