import React, { useEffect, useState } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import { SlArrowDown } from 'react-icons/sl';
import AgeRangeList from '../components/BottomSheet/AgeRangeList';
import InputField from '../components/InputField';
import BenefitCard from '../components/BenefitCard';
import PlanCard from '../components/PlanCard';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { benefitCards } from '../data/benefitsCard';
import FilterButton from '../components/FilterButton';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeModal, openModal } from '../store/modalSlice';
import Modal from '../components/Modal';
import Button from '../components/Button';

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
      <div className="flex items-center gap-4 py-4">
        <div className="flex gap-6">
          <button onClick={() => setSortOpen(true)} className="text-m flex items-center gap-1">
            {isSorted || '인기순'} <SlArrowDown />
          </button>
          <button onClick={() => setAgeOpen(true)} className="text-m flex items-center gap-1">
            {ageRanges || '전체'} <SlArrowDown />
          </button>
        </div>

        <div className="ml-auto">
          <FilterButton onClick={handleOpen} />
        </div>
      </div>
      {isOpen && (
        <Modal
          size="m"
          title=""
          subtitle=""
          leftButtonText=""
          onClose={handleClose} // 모달 닫기 테스트
          onConfirm={() => {
            dispatch(closeModal());
          }} // 버튼 확인 테스트용
          className="w-full h-full rounded-none sm:h-[90%] px-[20px]"
        >
          <div className="grid grid-cols-3 gap-4">
            {benefitCards.map((card, i) => (
              <BenefitCard key={i} {...card} />
            ))}
          </div>
          <div className="w-full flex gap-2 border border-red-500">
            <Button size="m" variant="ghost">
              초기화
            </Button>
            <Button size="m" variant="fill" className="flex-1">
              4개 요금제 보기
            </Button>
          </div>
        </Modal>
      )}

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
