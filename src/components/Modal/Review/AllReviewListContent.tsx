import { useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import ReviewCard from '../../ReviewCard';

interface Review {
  REVIEW_ID: number;
  USER_NAME: string;
  USER_BIRTHDAY: number; // ex) 20
  REVIEW_CONTENT: string;
  CREATED_AT: string;
  STAR_RATING: string;
}

type AllReviewListContentProps = {
  reviews: Review[];
};

const AllReviewListContent = ({ reviews }: AllReviewListContentProps) => {
  const [selectedAge, setSelectedAge] = useState<string>('전체');
  const [showFilter, setShowFilter] = useState(false);

  const ageGroups = ['전체', '10대 미만', '10대', '20대', '30대', '40대', '50대 이상'];

  const filterReviews = (review: Review) => {
    const age = review.USER_BIRTHDAY;
    if (selectedAge === '전체') return true;
    if (selectedAge === '10대 미만') return age < 10;
    if (selectedAge === '10대') return age === 10;
    if (selectedAge === '20대') return age === 20;
    if (selectedAge === '30대') return age === 30;
    if (selectedAge === '40대') return age === 40;
    if (selectedAge === '50대 이상') return age >= 50;
    return true;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-12 mb-1 md:mb-3 relative">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-1 text-m text-zinc-700 hover:text-pink-500 active:text-pink-500 transition-colors"
        >
          <FiSliders className="text-m" />
          <span>필터</span>
        </button>
        <h2 className="text-m font-bold text-center flex-1 -ml-8 md:text-lm">
          요금제 리뷰 전체보기
        </h2>

        {/* 필터 메뉴 */}
        {showFilter && (
          <div className="absolute top-8 left-2 bg-white rounded-md shadow px-3 py-2 text-sm z-20">
            {ageGroups.map((age) => (
              <div
                key={age}
                className={`px-2 py-1 cursor-pointer rounded hover:bg-zinc-100 ${
                  selectedAge === age ? 'font-bold text-pink-500' : ''
                }`}
                onClick={() => {
                  setSelectedAge(age);
                  setShowFilter(false);
                }}
              >
                {age}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review List */}
      <div className="overflow-y-auto px-4 pt-2 pb-6 flex-1">
        <div className="flex flex-col items-center space-y-4 py-2">
          {reviews.filter(filterReviews).map((review) => (
            <ReviewCard
              key={review.REVIEW_ID}
              writerName={review.USER_NAME}
              writerAge={`${review.USER_BIRTHDAY}대`}
              content={review.REVIEW_CONTENT}
              date={review.CREATED_AT.slice(2, 10).replace(/-/g, '.')}
              rating={parseFloat(review.STAR_RATING)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewListContent;
