import React from 'react';
import { HeaderProps } from '../components/Header';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import LoginBanner from '../components/LoginBanner';
import EventBannerCarousel from '../components/EventBanner/EventBannerCarousel';
import Button from '../components/Button';
import PlanCardSmall from '../components/PlanCardSmall';
import '../index.css';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { clearUser } from '../store/userSlice';

const CATEGORIES = ['청년', '청소년', '시니어', '일반'] as const;
type Category = (typeof CATEGORIES)[number];

// 전체 요금제 리스트 타입
type PlanListItem = {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  DATA_INFO: string;
  RECEIVED_STAR_COUNT: number;
  REVIEW_USER_COUNT: number;
};

// 연령대별 추천 요금제 타입
type RecommendedPlan = {
  planId: number;
  name: string;
  monthlyFee: number;
  dataInfo: string;
  shareData: string;
  avgRating: number;
  reviewCount: number;
};

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 테스트용 로그인 유저 강제 주입
    dispatch(
      setUser({
        id: 1,
        name: '홍길동',
        birthDay: '19200520',
        email: 'test@example.com',
        plan: 7,
        membership: 'vvip',
      })
    );
  }, []);

  // useEffect(() => {
  //   dispatch(clearUser()); // 테스트용 로그인 유저 상태 초기화할 때 사용하는 문장
  // }, []);

  // 1. Redux user 정보 가져오기
  const user = useSelector((state: RootState) => state.user);

  const scrollRef = useHorizontalScroll();
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [allPlans, setAllPlans] = useState<PlanListItem[]>([]);
  const [ageplans, setAgePlans] = useState<RecommendedPlan[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>('청년');

  // 1. 유저 멤버십 뱃지
  const membershipBadge = user.membership; // "vvip", "vip", "우수"
  const myPlan = allPlans.find((plan) => plan.PLAN_ID === user.plan);
  const isYouthPlan = myPlan?.PLAN_NAME.includes('유쓰');

  // 2. 표기용 이름 (우측 뱃지에 보일 텍스트)
  const membershipLabel = membershipBadge; // 멤버십은 항상 표기
  const showYouth = isYouthPlan; // 유쓰는 해당할 경우만 표
  const showMembership = Boolean(membershipLabel || showYouth);

  // 대표 페이지용 헤더 설정
  useEffect(() => {
    setHeaderConfig({
      title: '대표페이지',
      showBackButton: false,
      showSearch: false,
      hasShadow: false,
    });
  }, [setHeaderConfig]);

  // 전체 요금제 데이터 가져오기
  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const res = await fetch('https://seungwoo.i234.me:3333/planList', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
          setAllPlans(data.data);
        }
      } catch (err) {
        console.error('요금제 목록 불러오기 실패:', err);
      }
    };

    fetchAllPlans();
  }, []);

  // 연령대별 추천 요금제 데이터 가져오기
  useEffect(() => {
    if (!user.birthDay) return;

    const fetchRecommendedPlans = async () => {
      try {
        const res = await fetch('https://seungwoo.i234.me:3333/recommendPlansByAge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ birthday: user.birthDay }),
        });

        const data = await res.json();
        if (data.success) {
          setAgePlans(data.data);
        }
      } catch (err) {
        console.error('추천 요금제 불러오기 실패:', err);
      }
    };

    fetchRecommendedPlans();
  }, [user.birthDay]);

  // ageGroup 계산
  const getAgeGroup = (birth: string) => {
    const year = parseInt(birth.slice(0, 4)); // "19950315" → "1995"
    const age = new Date().getFullYear() - year;
    return `${Math.floor(age / 10) * 10}대`;
  };

  // 카테고리(청년, 청소년, 시니어, 일반)별 요금제 필터링 함수
  const filterPlansByCategory = (category: Category, plans: PlanListItem[]) => {
    return plans.filter((plan) => {
      const name = plan.PLAN_NAME;
      if (category === '청년') return name.includes('유쓰') || name.includes('현역병사');
      if (category === '청소년') return name.includes('청소년') || name.includes('키즈');
      if (category === '시니어') return name.includes('시니어');
      if (category === '일반') {
        return (
          !name.includes('유쓰') &&
          !name.includes('현역병사') &&
          !name.includes('청소년') &&
          !name.includes('키즈') &&
          !name.includes('시니어')
        );
      }
      return false;
    });
  };

  const filteredPlans = filterPlansByCategory(selectedCategory, allPlans);

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

      {/* 맞춤 요금제 (로그인한 경우에만) */}
      {user.birthDay && (
        <section className="ml-[5%] pt-6">
          <h2 className="text-lg font-semibold mb-1 max-[400px]:text-[20px]">
            {user.name}님을 위한 맞춤 요금제
          </h2>
          <p className="text-m mb-1 text-zinc-700">
            {getAgeGroup(user.birthDay)}가 선호하는 요금제를 모아봤어요
          </p>
          {/* 요금제 카드 좌측 shadow 가려지는 효과를 막기위한 마진과 패딩 추가(피그마 시안과 동일한 여백은 유지하도록) */}
          <div className="overflow-x-auto h-[210px] scrollbar-hide scroll-smooth ml-[-2%] pl-[2%]">
            <div className="flex gap-4 flex-nowrap w-max pr-4">
              {ageplans.map((plan) => (
                <PlanCardSmall
                  key={plan.planId}
                  name={plan.name}
                  description={plan.dataInfo}
                  price={`${plan.monthlyFee.toLocaleString()}원`}
                  discountedPrice={`${calculateDiscountedPrice(plan.monthlyFee, plan.name).toLocaleString()}원`}
                  rating={{
                    score: parseFloat(plan.avgRating?.toString() || '0'),
                    count: plan.reviewCount || 0,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 추천 요금제 영역 */}
      <section className="ml-[5%] pt-2">
        <h2 className="text-lg font-semibold mb-2 max-[400px]:text-[20px]">추천 요금제</h2>

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
        <div
          ref={scrollRef}
          className="overflow-x-auto h-[210px] scrollbar-hide scroll-smooth cursor-grab ml-[-2%] pl-[2%]"
        >
          <div className="flex gap-4 flex-nowrap w-max pr-4">
            {filteredPlans.map((plan) => {
              const discounted = calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME);
              return (
                <PlanCardSmall
                  key={plan.PLAN_ID}
                  name={plan.PLAN_NAME}
                  description={plan.DATA_INFO}
                  price={`${plan.MONTHLY_FEE.toLocaleString()}원`}
                  discountedPrice={`${discounted.toLocaleString()}원`}
                  rating={{
                    score: plan.RECEIVED_STAR_COUNT / Math.max(plan.REVIEW_USER_COUNT, 1),
                    count: plan.REVIEW_USER_COUNT,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 멤버십 혜택 영역 */}
      <div className="w-[90%] mx-auto pt-3 pb-16">
        {/* 로그인하지 않은 경우에만 배너 표시 */}
        {!user.name && <LoginBanner type="mainWhite" />}

        {/* 로그인한 경우에만 멤버십 카드 표시 */}
        {user.name && showMembership && (
          <div className="bg-horizontal rounded-[20px] shadow-[0_0_12px_rgba(0,0,0,0.08)] pb-5">
            {/* 흰 배경: 타이틀 + 뱃지 + 설명 */}
            <div className="bg-white w-full p-4 rounded-t-[20px]">
              <div className="flex items-center justify-start">
                <h2 className="text-lg font-bold px-2 max-[400px]:text-[20px]">나의 멤버십</h2>
                <div className="flex gap-2 ml-1">
                  {membershipLabel && (
                    <span className="inline-flex items-center bg-pink-500 text-white text-m max-[400px]:text-sm font-normal px-3 rounded-full leading-none h-7">
                      {membershipLabel}
                    </span>
                  )}
                  {showYouth && (
                    <span className="inline-flex items-center bg-violet-500 text-white text-m max-[400px]:text-sm font-medium px-3 rounded-full leading-none h-7">
                      유쓰
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 혜택 카드 목록 (그라데이션 배경) */}
            <div className="space-y-3 p-5 pt-4">
              <p className="text-m px-2">{membershipLabel} 멤버십 인기 혜택이에요!</p>
              {/* 유튜브 프리미엄 */}
              <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px]">
                <img
                  src="/images/membership/youtube.png"
                  alt="유튜브 로고"
                  className="w-12 h-12 ml-2 mr-3"
                />
                <div className="ml-3">
                  <p className="text-s text-zinc-500">유튜브 프리미엄 x 넷플릭스</p>
                  <p className="text-m font-regular max-[400px]:text-sm">
                    국내 유일! 최대 혜택가 11,900원에 이용하세요.
                  </p>
                </div>
              </div>

              {/* CGV */}
              <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px]">
                <img
                  src="/images/membership/cgv.png"
                  alt="CGV 로고"
                  className="w-12 h-12 ml-2 mr-3"
                />
                <div className="ml-3">
                  <p className="text-s text-zinc-500">CGV</p>
                  <p className="text-m font-regular max-[400px]:text-sm">
                    2D영화 장당 2,000원 할인
                  </p>
                </div>
              </div>

              {/* 롯데시네마 */}
              <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px]">
                <img
                  src="/images/membership/lotte-cinema.png"
                  alt="롯데시네마 로고"
                  className="w-18 h-12 mr-3"
                />
                <div>
                  <p className="text-s text-zinc-500">롯데시네마</p>
                  <p className="text-m font-regular max-[400px]:text-sm">연 6회 4,000원 할인</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
