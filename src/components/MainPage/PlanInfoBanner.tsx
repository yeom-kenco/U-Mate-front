// src/components/PlanInfoBanner.tsx
import React from 'react';

interface PlanInfoBannerProps {
  planName: string;
  dataInfo: string;
  dataInfoDetail: string;
}

const PlanInfoBanner = ({ planName, dataInfo, dataInfoDetail }: PlanInfoBannerProps) => {
  return (
    <div className="bg-primary text-white rounded-2xl px-5 py-7 max-[400px]:py-5 text-center">
      <p className="text-s mb-4 font-regular max-[400px]:text-xs">내가 사용중인 요금제</p>
      <h3 className="text-xl font-bold whitespace-pre-wrap max-[400px]:text-lg">{planName}</h3>
      <p className="text-m font-regular">
        {dataInfoDetail ? `${dataInfo} ${dataInfoDetail}` : dataInfo}
      </p>
    </div>
  );
};

export default PlanInfoBanner;
