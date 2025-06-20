import { useEffect, useState } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import { SlArrowDown } from 'react-icons/sl';
import AgeRangeList from '../components/BottomSheet/AgeRangeList';
import BenefitCard from '../components/BenefitCard';
import PlanCard from '../components/PlanCard';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { benefitCards } from '../data/benefitsCard';

import FilterButton from '../components/FilterButton';
import Modal from '../components/Modal';
import Button from '../components/Button';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeModal, openModal } from '../store/modalSlice';

const PricingPage = () => {
  const [sortopen, setSortOpen] = useState(false); // 정렬 시트 토글
  const [ageopen, setAgeOpen] = useState(false); // 연령 시트 토글
  const [isSorted, setIsSorted] = useState(''); // 선택된 정렬 기준
  const [ageRanges, SetAgeRanges] = useState(''); // 선택된 연령 기준
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

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
  return (
    <div className="h-full">
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
      <BenefitCard
        img="/images/chatbot/chatbot-main.png"
        title="OTT 서비스"
        descript="다양한 할인 혜택  다양한 할인 혜택  "
      />

      <PlanCard
        name="5G 프리미어 에센셜"
        description="데이터 무제한 테더링+쉐어링 70GB"
        price="월 85,000원"
        discountedPrice="월 58,500원"
        rating={{ score: 3.0, count: 15 }}
        size="small"
        onCompareClick={() => console.log('비교')}
        onChangeClick={() => console.log('변경')}
      />

      <PlanCard
        name="5G 프리미어 에센셜"
        description="데이터 무제한 테더링+쉐어링 70GB"
        price="월 85,000원"
        discountedPrice="월 58,500원"
        rating={{ score: 3.0, count: 15 }}
        size="large"
        onCompareClick={() => console.log('비교')}
        onChangeClick={() => console.log('변경')}
      />

      {/* 요금제 카드 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <PlanCard
            key={i}
            name="5G 프리미어 에센셜"
            description="데이터 무제한 테더링+쉐어링 70GB"
            price="월 85,000원"
            discountedPrice="월 58,500원"
            rating={{ score: 3.0, count: 15 }}
            size="large"
            onCompareClick={() => console.log('비교')}
            onChangeClick={handleOpen}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {benefitCards.map((card, i) => (
          <BenefitCard key={i} {...card} />
        ))}
      </div>

      <BottomSheet isOpen={sortopen} onClose={() => setSortOpen(false)} height="300px">
        <SortList onSelect={handleSortSelect} selected={isSorted} />
      </BottomSheet>

      <BottomSheet isOpen={ageopen} onClose={() => setAgeOpen(false)} height="350px">
        <AgeRangeList onSelect={handleAgeSelect} selected={ageRanges} />
      </BottomSheet>

      {isOpen && (
        <Modal
          title="해당 요금제로 변경하시겠습니까?"
          leftButtonText="취소"
          rightButtonText="변경하기"
          onClose={handleClose}
          onConfirm={handleClose}
        />
      )}
    </div>
  );
};

export default PricingPage;
