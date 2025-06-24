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
type DataRange = { label: string; value?: string };

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

  // 데이터 범위 리스트
  const dataRanges: DataRange[] = [
    { label: '완전 무제한', value: '완전 무제한' },
    { label: '다쓰면 무제한', value: '다쓰면 무제한' },
    { label: '상관없어요', value: '상관없어요' },
  ];
  return (
    <BaseModal
      onClose={onClose}
      className="z-50 rounded-none max-[500px]:min-h-full max-[500px]:min-w-full min-[500px]:rounded-2xl"
    >
      <div className="flex flex-col px-5 pt-4 pb-6 min-[500px]:h-[70vh] h-screen">
        {/* 닫기 버튼 */}
        <div className="flex justify-end pt-4 shrink-0 mb-6">
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-hide flex-1">
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

            {/* 데이터 */}
            <h2 className="text-lm font-bold mb-3">데이터</h2>
            <div className="flex gap-3 flex-wrap mb-6">
              {dataRanges.map(({ label, value }) => (
                <button
                  key={label}
                  className={`tag ${
                    filters.dataType === (value ?? '')
                      ? 'border-pink-500 border-2'
                      : 'border-zinc-200'
                  } rounded-full px-6 py-2 text-m font-semibold border`}
                  onClick={() =>
                    onChange({
                      ...filters,
                      dataType: value,
                    })
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 혜택 */}
            <div className="flex flex-col w-full">
              <h2 className="text-lm font-bold mb-5">혜택</h2>
              <div className="grid grid-cols-3 gap-4">
                {benefitCards.map((card) => {
                  const selectedIds = filters.benefitIds || [];
                  const isSelected = selectedIds.includes(card.id);

                  const handleClick = () => {
                    let updated: number[] = [];

                    if (card.id === 15) {
                      updated = isSelected ? [] : [15];
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
          </div>

          {/* 버튼 */}
          <div className="mt-8 flex gap-2 w-full">
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
              className="flex-1"
              onClick={() => {
                onApply();
                onClose();
              }}
              disabled={planCount === 0}
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
