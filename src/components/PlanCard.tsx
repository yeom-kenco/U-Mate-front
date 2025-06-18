import React from 'react';
import clsx from 'clsx';

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  discountedPrice?: string;
  rating?: {
    score: number;
    count: number;
  };
  highlight?: boolean;
  showButtons?: boolean;
  onChangeClick?: () => void;
  onCompareClick?: () => void;
  size?: 'small' | 'large';
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  discountedPrice,
  rating,
  highlight = false,
  showButtons,
  onChangeClick,
  onCompareClick,
  size = 'small',
}) => {
  const isLarge = size === 'large' ? (showButtons = true) : (showButtons = false);

  if (!isLarge) {
    return (
      <div
        className={clsx(
          'rounded-xl border bg-white shadow-sm px-4 my-4 py-3 w-full max-w-[254px] min-h-[166px] flex flex-col justify-between',
          highlight && 'border-pink-500'  
        )}
      >
        <div className="flex justify-between items-center">
          <p className="text-s text-gray-400">
            {name} <span className="text-lm">›</span>
          </p>
          {rating && (
            <div className="text-xs text-gray-500 flex items-center gap-[1px]">
              <span className="text-yellow-400">⭐</span>
              <span>{rating.score.toFixed(1)}</span>
              <span>({rating.count})</span>
            </div>
          )}
        </div>

        <div className="mt-1">
          <p className="text-sm max-[400px]:text-s font-bold text-black leading-tight w-2/3">
            {description}
          </p>
        </div>

        <div className="flex justify-between text-s text-black mt-2">
          <span>월정액</span>
          <p className="text-sm font-bold text-pink-500">{price}</p>
        </div>
        <div className="flex justify-between text-s text-black items-end">
          <span>약정할인가</span>
          <p className="text-sm font-bold">{discountedPrice}</p>
        </div>
      </div>
    );
  }

  // === Large 카드 렌더링 (그대로 유지) ===
  return (
    <div
      className={clsx(
        'rounded-xl border bg-white p-4 my-4 shadow-sm flex flex-col gap-2 w-full min-h-[330px]',
        highlight && 'border-pink-500'
      )}
    >
      {rating && (
        <div className="text-sm flex items-center gap-[1px] text-gray-500">
          <span className="text-yellow-400">⭐</span>
          <span>{rating.score.toFixed(1)}</span>
          <span>({rating.count})</span>
        </div>
      )}

      <div className="text-base text-gray-700">
        {name} <span className="text-lg">›</span>
      </div>
      <div className="text-lg text-black font-bold w-2/3">{description}</div>

      <div className="mt-2">
        <p className="text-xl font-bold text-black">{price}</p>
        {discountedPrice && (
          <p className="text-sm text-gray-400">약정 할인 시 월 {discountedPrice}</p>
        )}
      </div>

      {showButtons && (
        <div className="flex gap-2 mt-3 text-sm">
          <button
            onClick={onCompareClick}
            className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600"
          >
            비교하기
          </button>
          <button
            onClick={onChangeClick}
            className="flex-1 py-1 rounded-lg border border-pink-500 text-pink-600"
          >
            변경하기
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
