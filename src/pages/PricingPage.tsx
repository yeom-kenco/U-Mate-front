import { useEffect, useState } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import { SlArrowDown } from 'react-icons/sl';
import AgeRangeList from '../components/BottomSheet/AgeRangeList';
import PlanCard from '../components/PlanCard';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';

import FilterButton from '../components/FilterButton';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeModal, openModal } from '../store/modalSlice';
import Button from '../components/Button';

const plans = [
  {
    id: 1,
    name: '5G 프리미어 에센셜',
    description: '데이터 무제한 테더링+쉐어링 70GB',
    price: '월 85,000원',
    discountedPrice: '월 58,500원',
    rating: { score: 3.0, count: 15 },
  },
  {
    id: 2,
    name: '5G 프리미어 베이직',
    description: '데이터 150GB+5Mbps',
    price: '월 75,000원',
    discountedPrice: '월 52,500원',
    rating: { score: 4.0, count: 10 },
  },
  {
    id: 3,
    name: '5G 시그니처',
    description: '데이터 완전 무제한',
    price: '월 100,000원',
    discountedPrice: '월 70,000원',
    rating: { score: 4.5, count: 5 },
  },
  {
    id: 4,
    name: '5G 슬림',
    description: '데이터 9GB+1Mbps',
    price: '월 55,000원',
    discountedPrice: '월 38,500원',
    rating: { score: 3.2, count: 8 },
  },
  {
    id: 5,
    name: '5G 라이트',
    description: '데이터 12GB+1Mbps',
    price: '월 60,000원',
    discountedPrice: '월 42,000원',
    rating: { score: 4.1, count: 12 },
  },
  {
    id: 6,
    name: '5G 슈퍼',
    description: '데이터 200GB+5Mbps',
    price: '월 90,000원',
    discountedPrice: '월 63,000원',
    rating: { score: 4.8, count: 20 },
  },
];

const PricingPage = () => {
  const [sortopen, setSortOpen] = useState(false); // 정렬 시트 토글
  const [ageopen, setAgeOpen] = useState(false); // 연령 시트 토글
  const [isSorted, setIsSorted] = useState(''); // 선택된 정렬 기준
  const [ageRanges, SetAgeRanges] = useState(''); // 선택된 연령 기준
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  const [visibleCount, setVisibleCount] = useState(3); // 일단 3개만 보여주기

  // 필터 버튼 모달 상태
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const isOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    setHeaderConfig({
      title: '요금제',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  // 정렬 기준 선택 시
  const handleSortSelect = (value: string) => {
    setIsSorted(value);
    setSortOpen(false);
  };

  // 연령대 선택 시
  const handleAgeSelect = (value: string) => {
    SetAgeRanges(value);
    setAgeOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="px-4 md:px-10">
      {/* 필터 영역 */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex gap-6 text-m">
          <button onClick={() => setSortOpen(true)} className="flex items-center gap-2">
            {isSorted || '인기순'} <SlArrowDown />
          </button>
          <button onClick={() => setAgeOpen(true)} className="flex items-center gap-2">
            {ageRanges || '전체'} <SlArrowDown />
          </button>
        </div>

        <div className="ml-auto">
          <FilterButton onClick={handleOpen} />
        </div>
      </div>
      {/* 요금제 카드 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-4">
        {plans.slice(0, visibleCount).map((plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            description={plan.description}
            price={plan.price}
            discountedPrice={plan.discountedPrice}
            rating={plan.rating}
            size="large"
            onCompareClick={() => console.log('비교')}
            onChangeClick={handleOpen}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 mb-20">
        <Button
          variant="outline"
          color="gray"
          size="xl"
          rounded="full"
          onClick={handleLoadMore}
          disabled={visibleCount >= plans.length}
        >
          요금제 더보기 ({visibleCount}/{plans.length})
        </Button>
      </div>

      <BottomSheet isOpen={sortopen} onClose={() => setSortOpen(false)} height="300px">
        <SortList onSelect={handleSortSelect} selected={isSorted} />
      </BottomSheet>

      <BottomSheet isOpen={ageopen} onClose={() => setAgeOpen(false)} height="350px">
        <AgeRangeList onSelect={handleAgeSelect} selected={ageRanges} />
      </BottomSheet>
    </div>
  );
};

export default PricingPage;
