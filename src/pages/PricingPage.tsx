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

const PricingPage = () => {
  const [sortopen, setSortOpen] = useState(false); // 정렬 시트 토글
  const [ageopen, setAgeOpen] = useState(false); // 연령 시트 토글
  const [isSorted, setIsSorted] = useState(''); // 선택된 정렬 기준
  const [ageRanges, SetAgeRanges] = useState(''); // 선택된 연령 기준
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

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
      <div className="flex gap-4 p-4">
        <button onClick={() => setSortOpen(true)} className="text-sm font-semibold flex gap-1">
          {isSorted || '인기순'} <SlArrowDown className="relative top-[2px]" />
        </button>
        <button onClick={() => setAgeOpen(true)} className="text-sm font-semibold flex gap-1">
          {ageRanges || '전체'} <SlArrowDown className="relative top-[2px]" />
        </button>
      </div>
      <InputField label="이름" required placeholder="이름을 입력해주세요" />
      <InputField variant="box" label="비밀번호" placeholder="비밀번호를 입력해주세요" />
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
