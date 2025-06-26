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
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'select-none rounded-2xl cursor-pointer bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)] px-6 my-4 py-4 min-w-[254px] min-h-[166px] flex flex-col justify-between md:rounded-3xl md:w-[300px] md:min-w-[320px] md:h-[230px] transition transform duration-150 active:scale-95 hover:shadow-lg lg:w-[440px] lg:h-[280px]',
        highlight && 'border-pink-500'
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-s cursor-pointer md:text-m lg:text-lm">
          {name} <span className="text-lm md:text-lg">›</span>
        </p>
        {rating && (
          <div className="text-s flex items-center gap-[1px] md:text-m lg:text-lm">
            <span className="text-yellow-400">⭐</span>
            <span>{rating.score.toFixed(1)}</span>
            <span>({rating.count})</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-black leading-tight w-2/3 md:text-lm lg:text-xl">
          {description}
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between text-s text-black md:text-sm lg:text-m">
          <span>월정액</span>
          <p className="text-sm font-bold text-pink-500 md:text-m lg:text-lm">{price}</p>
        </div>
        <div className="flex justify-between text-s md:text-sm text-black items-end lg:text-m">
          <span>약정할인가</span>
          <p className="text-sm font-bold md:text-m lg:text-lm">{discountedPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCardSmall;
