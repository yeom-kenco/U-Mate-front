import React from 'react';

interface AgeListProps {
  onSelect: (value: string) => void;
  selected: string;
}

const sortLists = ['전체', '20대', '30대', '40대', '50대', '60대이상'];

const AgeRangeList: React.FC<AgeListProps> = ({ onSelect, selected }) => {
  return (
    <ul className="flex flex-col px-3 py-2  gap-1 ">
      <p className="font-bold text-lg">연령 구분</p>
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

export default AgeRangeList;
