import { BsSliders } from 'react-icons/bs';

type Props = {
  onClick?: () => void;
};

const FilterButton = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-1 p-1 text-m cursor-pointer w-fit h-auto"
    >
      <BsSliders className="w-4 h-4 relative top-[-1.5px]" />
      <span className="w-fit">필터</span>
    </div>
  );
};

export default FilterButton;
