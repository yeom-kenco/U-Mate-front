import { spawn } from 'child_process';
import React from 'react';

interface SortListProps {
  onSelect: (value: string) => void;
  selected: string;
}

const sortLists = ['인기순', '높은 가격순', '낮은 가격순', '리뷰 많은 순'];

const SortList: React.FC<SortListProps> = ({ onSelect, selected }) => {
  return (
    <ul className="flex flex-col px-3 py-2  gap-1">
      <p className="font-bold  text-lg">정렬 기준</p>
      {sortLists.map((sort) => (
        <li
          key={sort}
          className={`py-2 cursor-pointer text-sm ${
            selected === sort ? 'text-gray-900 font-bold' : 'text-gray-700'
          }`}
          onClick={() => onSelect(sort)}
        >
          {sort} {selected === sort && <span className="float-right text-pink-500 ">✔</span>}
        </li>
      ))}
    </ul>
  );
};

export default SortList;
