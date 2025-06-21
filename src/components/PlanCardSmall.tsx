import React from 'react';
import clsx from 'clsx';
import { PlanCardProps } from './PlanCard';

const PlanCardSmall: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  discountedPrice,
  rating,
  highlight,
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl cursor-pointer bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)] px-6 my-4 py-4 w-full max-w-[254px] min-h-[166px] flex flex-col justify-between',
        highlight && 'border-pink-500'
      )}
    >
      <div className="flex justify-between items-center">
        <p className="text-s cursor-pointer">
          {name} <span className="text-lm">›</span>
        </p>
        {rating && (
          <div className="text-s flex items-center gap-[1px]">
            <span className="text-yellow-400">⭐</span>
            <span>{rating.score.toFixed(1)}</span>
            <span>({rating.count})</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm  font-bold text-black leading-tight w-2/3">{description}</p>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between text-s text-black">
          <span>월정액</span>
          <p className="text-sm font-bold text-pink-500">{price}</p>
        </div>
        <div className="flex justify-between text-s text-black items-end">
          <span>약정할인가</span>
          <p className="text-sm font-bold">{discountedPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCardSmall;
