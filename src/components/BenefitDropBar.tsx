import { useState } from 'react';
import BenefitItem from './BenefitItem';
import type { BenefitItem as BenefitItemType } from '../data/benefits';
import { FiChevronRight } from 'react-icons/fi';

interface BenefitDropProps {
  label: string;
  indexes: number[];
  data: BenefitItemType[];
}

const BenefitDropBar = ({ label, indexes, data }: BenefitDropProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="mb-6">
      <button
        className="flex items-center justify-between w-full font-bold text-lg mb-2"
        onClick={toggle}
      >
        {label}
        <span
          className={`ml-2 text-zinc-600 transition-transform duration-300 ${
            isOpen ? '-rotate-90' : 'rotate-90'
          }`}
        >
          <FiChevronRight size={20} />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {indexes.map((idx) => {
          const item = data[idx];
          return (
            <BenefitItem
              key={idx}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BenefitDropBar;
