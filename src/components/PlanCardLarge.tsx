import React from 'react';
import clsx from 'clsx';
import { PlanCardProps } from './PlanCard';
import Button from './Button';
import { SlArrowRight } from 'react-icons/sl';

const PlanCardLarge: React.FC<PlanCardProps> = ({
  name,
  dataInfo,
  shareInfo,
  price,
  discountedPrice,
  rating,
  highlight,
  showButtons = true,
  onCompareClick,
  onChangeClick,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl cursor-pointer border bg-white p-4 flex flex-col gap-2 min-h-[325px] transition-all duration-200 ease-in-out',
        'hover:shadow-lg hover:-translate-y-1 active:translate-y-0.5 active:shadow-sm',
        highlight && 'border-pink-500'
      )}
      onClick={onClick}
    >
      {rating && (
        <div className="text-sm flex items-center gap-[1px]">
          <span className="text-yellow-400">⭐</span>
          <span>{rating.score.toFixed(1)}</span>
          <span>({rating.count})</span>
        </div>
      )}

      <div className="flex text-base cursor-pointer">
        {name}
        <span className="text-sm mt-1">
          <SlArrowRight />
        </span>
      </div>
      <div className="text-lg text-black font-bold w-2/3">{dataInfo}</div>
      <div className="text-lg text-black font-bold w-2/3">{shareInfo}</div>

      <div className="mt-2">
        <p className="text-xl font-bold text-black">월 {price}원</p>
        {discountedPrice && <p className="text-sm ">약정 할인 시 월 {discountedPrice}원</p>}
      </div>

      {showButtons && (
        <div className="flex gap-2 mt-auto pt-3 text-sm">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 방지
              onCompareClick?.(e);
            }}
            variant="outline"
            color="gray"
            size="lg"
            className="flex-1 font-semibold"
          >
            비교하기
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 방지
              onChangeClick?.(e); // 부모 함수 호출
            }}
            variant="outline"
            color="pink"
            size="lg"
            className="flex-1 font-semibold"
          >
            신청하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanCardLarge;
