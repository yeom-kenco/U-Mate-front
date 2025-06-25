import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import clsx from 'clsx';
type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const StarRating = ({ value, onChange, className }: StarRatingProps) => {
  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = isHalf ? index + 0.5 : index + 1;
    onChange(newRating);
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className={clsx('relative cursor-pointer', className)}>
          {/* 왼쪽 반 클릭 */}
          <div
            className="absolute left-0 w-1/2 h-full z-10"
            onClick={() => handleClick(index, true)}
          />
          {/* 오른쪽 반 클릭 */}
          <div
            className="absolute right-0 w-1/2 h-full z-10"
            onClick={() => handleClick(index, false)}
          />

          {/* 빈 별 */}
          <AiOutlineStar className="w-full h-full text-yellow-300" />

          {/* 채워진 별 (전부 or 반) */}
          {value >= index + 1 ? (
            <AiFillStar className="absolute top-0 left-0 w-full h-full text-yellow-400" />
          ) : value >= index + 0.5 ? (
            <AiFillStar
              className="absolute top-0 left-0 w-full h-full text-yellow-400"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
