import React from 'react';
import LoginBanner from '../components/LoginBanner';
import EventBannerCarousel from '../components/EventBanner/EventBannerCarousel';

const MainPage = () => {
  return (
    <div className="bg-background">
      <div className="relative z-20">
        {/* 하얀색 배너 영역 */}
        <div className="bg-white rounded-b-[32px] shadow-[0_8px_15px_-4px_rgba(0,0,0,0.1)] w-full px-[5%] pt-2 pb-6">
          <LoginBanner type="mainGradient" />
        </div>
      </div>
      {/* 이벤트 영역 */}
      <div className="py-9">
        <EventBannerCarousel />
      </div>
    </div>
  );
};

export default MainPage;
