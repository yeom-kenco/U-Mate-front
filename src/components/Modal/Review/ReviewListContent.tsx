import React from 'react';

type ReviewListContentProps = {
  children: React.ReactNode;
};

const ReviewListContent = ({ children }: ReviewListContentProps) => {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-0">
        <h2 className="text-m font-bold text-center mb-8 shrink-0 md:text-lm">내가 작성한 리뷰</h2>
        <div className="overflow-y-auto scrollbar-hide px-6 pb-4 flex-1">
          <div className="flex flex-col items-center space-y-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ReviewListContent;
