import clsx from 'clsx';
import { useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { agreements } from '../data/agreements';

interface CheckBoxProps {
  id: string;
  title?: string;
  showButton?: boolean;
  checked: boolean;
  onChange: (id: string, value: boolean) => void;
}

const CheckBox = ({
  id,
  title = '전체 선택',
  showButton = true,
  checked,
  onChange,
}: CheckBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 해당 id에 일치하는 설명 데이터만 가져오기
  const matchedAgreement = agreements.find((a) => a.id === id);

  return (
    <div className=" border border-zinc-300 rounded-sm">
      <div className="flex justify-between items-center text-m pt-[5px]  bg-background h-9 w-full">
        <div className="flex gap-2 items-center pb-2">
          <div
            onClick={() => onChange(id, !checked)}
            className={`w-6 h-6 ml-1 rounded-md cursor-pointer border 
              flex items-center justify-center text-s 
              transition-all duration-150
              ${checked ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-400 border-gray-400'}`}
          >
            ✔
          </div>
          <p className={clsx('text-sm mt-2', !showButton && 'font-bold')}>{title}</p>
        </div>
        {/* 오른쪽: 화살표 */}
        {showButton && (
          <SlArrowRight
            className="w-4 h-4 mr-1 mb-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      {/* 드롭다운 이용약관*/}
      <div
        className={clsx(
          'transition-all duration-500 overflow-y-scroll px-3 text-xs text-gray-700 scrollbar-hidden ',
          isOpen ? 'max-h-[250px] py-2 opacity-100' : 'max-h-0 py-0 opacity-0 '
        )}
      >
        {matchedAgreement && (
          <div>
            <p className="font-semibold mb-1 text-sm">{matchedAgreement.title}</p>
            <p className="whitespace-pre-line">{matchedAgreement.descript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
