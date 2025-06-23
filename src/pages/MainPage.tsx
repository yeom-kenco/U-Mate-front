import React from 'react';
import { HeaderProps } from '../components/Header';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import LoginBanner from '../components/LoginBanner';
import EventBannerCarousel from '../components/EventBanner/EventBannerCarousel';
import Button from '../components/Button';
import PlanCardSmall from '../components/PlanCardSmall';
import '../index.css';

const CATEGORIES = ['청년', '청소년', '시니어', '일반'] as const;
type Category = (typeof CATEGORIES)[number];

const mockPlans = [
  {
    id: 1,
    category: '청년',
    name: '5G 프리미어 플러스',
    description: '데이터 무제한 테더링+쉐어링 100GB',
    price: '105,000원',
    discountedPrice: '73,500원',
    rating: { score: 3.0, count: 15 },
  },
  {
    id: 2,
    category: '시니어',
    name: '시니어 스마트 요금제',
    description: '기본 제공 3GB + 음성 무제한',
    price: '45,000원',
    discountedPrice: '29,500원',
    rating: { score: 4.5, count: 30 },
  },
  {
    id: 3,
    category: '청년',
    name: '5G 프리미어 플러스',
    description: '데이터 무제한 테더링+쉐어링 100GB',
    price: '105,000원',
    discountedPrice: '73,500원',
    rating: { score: 3.0, count: 15 },
  },
  {
    id: 4,
    category: '청년',
    name: '5G 프리미어 플러스',
    description: '데이터 무제한 테더링+쉐어링 100GB',
    price: '105,000원',
    discountedPrice: '73,500원',
    rating: { score: 3.0, count: 15 },
  },
  //추후 백엔드 연동 시 상태 바인딩 바꿔줘야 함
];

const MainPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [selectedCategory, setSelectedCategory] = useState<Category>('청년');

  const filteredPlans = mockPlans.filter((plan) => plan.category === selectedCategory);

  useEffect(() => {
    setHeaderConfig({
      title: '대표페이지',
      showBackButton: false,
      showSearch: false,
      hasShadow: false,
    });
  }, [setHeaderConfig]);

  return (
    <div className="bg-background">
      {/* 하얀색 배너 영역 */}
      <div className="relative">
        <div className="bg-white rounded-b-[32px] shadow-[0_8px_15px_-4px_rgba(0,0,0,0.1)] w-full px-[5%] pt-2 pb-6">
          <LoginBanner type="mainGradient" />
        </div>
      </div>

      {/* 이벤트 영역 */}
      <div className="pt-9">
        <EventBannerCarousel />
      </div>

      {/* 추천 요금제 영역 */}
      <section className="ml-[5%] pt-6">
        <h2 className="text-lg font-semibold mb-2">추천 요금제</h2>

        {/* 카테고리 버튼 */}
        <div className="flex gap-2 mb-1">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              size="sm"
              variant="fill"
              color={selectedCategory === category ? 'pink' : 'white'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* 요금제 카드 리스트 */}
        <div className="overflow-x-auto h-[210px] scrollbar-hidden scroll-smooth">
          <div className="flex gap-4 flex-nowrap w-max pr-4">
            {filteredPlans.map((plan) => (
              <PlanCardSmall key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* 멤버십 혜택 영역 */}
      <div className="w-[90%] mx-auto pb-16">
        <LoginBanner type="mainWhite" />
      </div>
    </div>
  );
};

export default MainPage;
