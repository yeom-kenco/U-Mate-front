// components/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';

interface HeroSectionProps {
  isLoggedIn: boolean;
  userName?: string;
  plan?: {
    planId: number;
    name: string;
    dataInfo: string;
    dataInfoDetail: string;
  };
}

const HeroSection = ({ isLoggedIn, plan }: HeroSectionProps) => {
  return (
    <div className="w-full h-[83vh] flex items-center justify-center bg-primary rounded-[56px] text-white px-6 lg:px-[5%]">
      <div className="text-center">
        {isLoggedIn && plan ? (
          <>
            <p className="text-lg font-light mb-16">내가 사용중인 요금제</p>
            <h1 className="text-[3rem] font-bold mb-2">{plan.name}</h1>
            <p className="text-xl mb-6">
              {plan.dataInfoDetail ? `${plan.dataInfo} ${plan.dataInfoDetail}` : plan.dataInfo}
            </p>
            <Link
              to={`/compare?plan1=${plan.planId}`}
              className="inline-flex items-center mt-10 px-16 py-3 border border-white rounded-full text-white text-base hover:bg-white hover:text-purple-700 transition"
            >
              다른 요금제랑 비교해보기
              <FiChevronRight className="ml-2 mt-[-1px]" />
            </Link>
          </>
        ) : (
          <>
            <p className="text-lg font-light mb-8">복잡한 선택, 대신 고민해드릴게요.</p>
            <h1 className="text-[3rem] font-bold mb-12">
              요금제, 고민하지 말고 <span className="text-pink-500">U: </span>Mate 하세요.
            </h1>
            <Link
              to="/login"
              className="inline-block px-16 py-3 border border-white rounded-full text-white hover:bg-white hover:text-purple-700 transition"
            >
              지금 시작하기
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
