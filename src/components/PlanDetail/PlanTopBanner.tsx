import React from 'react';
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
    <div className="rounded-b-[20px] px-9 pt-9 pb-4 max-[400px]:px-7 max-[400px]:pt-7 max-[400px]:pb-3 md:px-52 bg-rdiagonal text-black shadow-[0_8px_15px_-4px_rgba(0,0,0,0.2)]">
      {/* 인기 & 별점 */}
      <div className="flex items-center gap-1 mt-1 mb-1">
        {isPopular && (
          <span className="text-m px-2 py-1 rounded-full bg-pink-500 text-white">인기</span>
        )}
        <span className="text-yellow-400 text-m">⭐</span>
        <span className="text-m">{starRating.toFixed(1)}</span>
      </div>

      {/* 요금제명 & 월정액 */}
      <h1 className="text-xl font-bold max-[400px]:text-lg">{planName}</h1>
      <p className="text-lg mt-1 font-semibold max-[400px]:text-lm text-black">
        월 {monthlyFee.toLocaleString()}원
      </p>

      {/* 할인 정보 */}
      <div className="text-s mt-8 text-gray-500 space-y-1 md:text-sm">
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
          <p className="text-black text-m font-semibold md:text-lm">할인 시</p>
          <p className="text-pink-500 text-lg font-semibold md:text-xl">
            {discountedPrice.toLocaleString()}원
          </p>
        </div>

        {/* 요금제 슬라이드 카드 영역 */}
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <div className="overflow-x-auto scrollbar-hide pl-9 py-6 md:pl-52">
            <div className="inline-flex gap-2 pr-4 md:gap-4">
              {dataInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac min-w-[145px] max-w-[145px] min-h-24 max-h-24 text-s md:text-m md:min-h-32 md:max-h-32 md:min-w-[185px] md:max-w-[185px]">
                  <p className="text-gray-500">데이터</p>
                  <p className="font-bold">{dataInfo}</p>
                </div>
              )}

              {shareData && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac min-w-[145px] max-w-[145px] min-h-24 max-h-24 text-s md:text-m md:min-h-32 md:max-h-32 md:min-w-[185px] md:max-w-[185px]">
                  <p className="text-gray-500">공유 데이터</p>
                  <p className="font-bold">{shareData}</p>
                </div>
              )}

              {callInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac min-w-[145px] max-w-[145px] min-h-24 max-h-24 text-s md:text-m md:min-h-32 md:max-h-32 md:min-w-[185px] md:max-w-[185px]">
                  <p className="text-gray-500">음성 통화</p>
                  <p className="font-bold">{callInfo}</p>
                </div>
              )}

              {smsInfo && (
                <div className="bg-[rgba(255,255,255,0.35)] rounded-[8px] py-3 px-4 shadow-lilac min-w-[145px] max-w-[145px] min-h-24 max-h-24 text-s md:text-m md:min-h-32 md:max-h-32 md:min-w-[185px] md:max-w-[185px]">
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
