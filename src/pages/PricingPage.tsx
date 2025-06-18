import React, { useState } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import { SlArrowDown } from 'react-icons/sl';
const PricingPage = () => {
  const [sortopen, setSortOpen] = useState(false);
  const [ageopen, setAgeOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(''); // 선택된 정렬 기준
  const [ageRanges, SetAgeRanges] = useState(''); // 선택된 연령 기준

  const handleSelect = (value: string) => {
    setIsSorted(value);
    setSortOpen(false);
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

      <BottomSheet isOpen={sortopen} onClose={() => setSortOpen(false)} height="300px">
        <SortList onSelect={handleSelect} selected={isSorted} />
      </BottomSheet>

      <BottomSheet isOpen={ageopen} onClose={() => setAgeOpen(false)} height="400px">
        <SortList onSelect={handleSelect} selected={isSorted} />
      </BottomSheet>
    </div>
  );
};

export default PricingPage;
