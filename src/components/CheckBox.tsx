import clsx from 'clsx';
import { SlArrowRight } from 'react-icons/sl';

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
  return (
    <div className="flex justify-between items-center text-m pt-[5px] mb-2 bg-background h-9 w-full">
      <div className="flex gap-2 items-center pb-2">
        {/*체크박스  텍스트 */}
        <div
          onClick={() => onChange(id, !checked)}
          className={`w-6 h-6 rounded-md cursor-pointer border 
            flex items-center justify-center text-s 
            transition-all duration-150
            ${checked ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-400 border-gray-400'}`}
        >
          ✔
        </div>
        <p className={clsx('text-sm mt-2', !showButton && 'font-bold')}>{title}</p>
      </div>
      {/* 오른쪽: 화살표 */}
      {showButton && <SlArrowRight className="w-4 h-4 mr-1 mb-1" />}
    </div>
  );
};

export default CheckBox;
