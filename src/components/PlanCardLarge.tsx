import React from 'react';
import clsx from 'clsx';
import { PlanCardProps } from './PlanCard';
import Button from './Button';

const PlanCardLarge: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  discountedPrice,
  rating,
  highlight,
  showButtons = true,
  onCompareClick,
  onChangeClick,
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl cursor-pointer   border bg-white p-4 my-4 shadow-sm flex flex-col gap-2 w-[98%] min-h-[325px]',
        highlight && 'border-pink-500'
      )}
    >
      {rating && (
        <div className="text-sm flex items-center gap-[1px]">
          <span className="text-yellow-400">⭐</span>
          <span>{rating.score.toFixed(1)}</span>
          <span>({rating.count})</span>
        </div>
      )}

      <div className="text-base cursor-pointer">
        {name} <span className="text-lg">›</span>
      </div>
      <div className="text-lg text-black font-bold w-2/3">{description}</div>

      <div className="mt-2">
        <p className="text-xl font-bold text-black">{price}</p>
        {discountedPrice && <p className="text-sm ">약정 할인 시 {discountedPrice}</p>}
      </div>

      {showButtons && (
        <div className="flex gap-2 mt-3 text-sm">
          <Button
            onClick={onCompareClick}
            variant="outline"
            color="gray"
            size="lg"
            className="flex-1 font-semibold"
          >
            비교하기
          </Button>
          <Button
            onClick={onChangeClick}
            variant="outline"
            color="pink"
            size="lg"
            className="flex-1 font-semibold"
          >
            변경하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanCardLarge;
