import React from 'react';

interface SortListProps {
  onSelect: (value: string) => void;
  selected: string;
}

const sortLists = ['인기순', '높은 가격순', '낮은 가격순', '리뷰 많은 순'];

const SortList: React.FC<SortListProps> = ({ onSelect, selected }) => {
  return (
    <ul className="flex flex-col px-5 gap-1 max-h-max overflow-auto ml-16">
      <p className="font-bold text-lg md:text-xl b-3">정렬 기준</p>
      {sortLists.map((sort) => (
        <li
          key={sort}
          className={`py-3 cursor-pointer text-lm md:text-lg ${
            selected === sort ? 'text-pink-500 font-bold' : 'text-gray-700'
          }`}
          onClick={() => onSelect(sort)}
        >
          {sort} {selected === sort && <span className="text-pink-500 ml-5">✔</span>}
        </li>
      ))}
    </ul>
  );
};

export default SortList;
