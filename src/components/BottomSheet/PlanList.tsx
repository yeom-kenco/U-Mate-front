import { spawn } from 'child_process';
import React from 'react';
import { plans } from '../../data/plans';

interface PlanListProps {
  onSelect: (value: string) => void;
  selected: string;
}

const PlanList: React.FC<PlanListProps> = ({ onSelect, selected }) => {
  return (
    <ul className="flex flex-col px-3 py-2 gap-1">
      <p className="font-bold  text-lg">정렬 기준</p>
      {plans.map((plan) => (
        <li
          key={plan.id}
          className={`py-2 cursor-pointer text-sm ${
            selected === plan.name ? 'text-gray-900 font-bold' : 'text-gray-700'
          }`}
          onClick={() => onSelect(plan.name)}
        >
          {plan.name}
          {selected === plan.name && <span className="float-right text-pink-500 ">✔</span>}
        </li>
      ))}
    </ul>
  );
};

export default PlanList;
