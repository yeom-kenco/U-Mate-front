import { useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
interface CheckBoxProps {
  showButton: boolean;
  title?: string;
}

const CheckBox = ({ title = '전체 선택', showButton = true }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex gap-2 text-m pt-[5px] mb-2 bg-background">
      {/*체크박스*/}
      <div
        onClick={() => setChecked(!checked)}
        className={`w-6 h-5 rounded-md cursor-pointer border 
        flex items-center justify-center text-s 
        transition-all duration-150
        ${checked ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-400 border-gray-400'}`}
      >
        ✔
      </div>
      <p className="relative bottom-[1px]">{title}</p>
      {showButton && <SlArrowRight className="w-4 h-4 mr-1" />}
    </div>
  );
};

export default CheckBox;
