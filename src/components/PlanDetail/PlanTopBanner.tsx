import '../../index.css';

interface PlanTopBannerProps {
  planName: string;
  monthlyFee: number;
  dataInfo: string;
  shareData: string;
  callInfo: string;
  smsInfo: string;
  starRating: number;
  isPopular?: boolean;
  discountedPrice: number;
}

const PlanTopBanner = ({
  planName,
  monthlyFee,
  dataInfo,
  shareData,
  callInfo,
  smsInfo,
  starRating,
  discountedPrice,
  isPopular = false,
}: PlanTopBannerProps) => {
  return (
    <div className="rounded-b-[20px] px-4 pt-9 pb-4 lg:px-20 bg-diagonal text-black shadow-[0_8px_15px_-4px_rgba(0,0,0,0.2)] lg:rounded-none">
      {/* 인기 & 별점 */}
      <div className="flex items-center gap-1 mt-1 mb-1">
        {isPopular && (
          <span className="text-m px-2 py-1 rounded-full bg-pink-500 text-white">인기</span>
        )}
        <span className="text-yellow-400 text-m lg:text-lm">⭐</span>
        <span className="text-m lg:text-lm">{starRating.toFixed(1)}</span>
      </div>

      {/* 요금제명 & 월정액 */}
      <h1 className="text-lg font-bold sm:text-xxl">{planName}</h1>
      <p className="text-lm mt-1 font-semibold sm:text-xl lg:mt-4 text-black">
        월 {monthlyFee.toLocaleString()}원
      </p>

      {/* 할인 정보 */}
      <div className="text-s mt-8 text-gray-500 space-y-2 sm:text-m">
        <div className="flex justify-between">
          <p>선택 약정 할인 시</p>
          <p>-{Math.floor(monthlyFee * 0.25).toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p>프리미어 요금제 약정 할인 시</p>
          <p>{planName.includes('프리미어') ? '5,250원' : '0원'}</p>
        </div>
      </div>

      {/* 할인 적용 가격 */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <div className="flex justify-between">
          <p className="text-black text-m font-semibold sm:text-lm mt-4">할인 시</p>
          <p className="text-pink-500 text-lg font-semibold sm:text-xl">
            {discountedPrice.toLocaleString()}원
          </p>
        </div>

        {/* 요금제 슬라이드 카드 영역 */}
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <div className="overflow-x-auto scrollbar-hide py-6 px-4 lg:px-20">
            <div className="inline-flex gap-2 pr-4 md:gap-4">
              {dataInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac w-[145px] h-24 text-s md:text-lm md:min-h-44 md:min-w-[300px] lg:text-lg flex flex-col gap-2 lg:rounded-xl">
                  <p className="text-gray-500">데이터</p>
                  <p className="font-bold">{dataInfo}</p>
                </div>
              )}

              {shareData && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac w-[145px] h-24 text-s md:text-lm md:min-h-44 md:min-w-[300px] lg:text-lg flex flex-col gap-2 lg:rounded-xl">
                  <p className="text-gray-500">공유 데이터</p>
                  <p className="font-bold">{shareData}</p>
                </div>
              )}

              {callInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac w-[145px] h-24 text-s md:text-lm md:min-h-44 md:min-w-[300px] lg:text-lg flex flex-col gap-2 lg:rounded-xl">
                  <p className="text-gray-500">음성 통화</p>
                  <p className="font-bold">{callInfo}</p>
                </div>
              )}

              {smsInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac w-[145px] h-24 text-s md:text-lm md:min-h-44 md:min-w-[300px] lg:text-lg flex flex-col gap-2 lg:rounded-xl">
                  <p className="text-gray-500">문자메세지</p>
                  <p className="font-bold">{smsInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTopBanner;
