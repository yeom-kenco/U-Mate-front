import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import { Plan } from '../../types/plan';

interface PlanListProps {
  onSelect: (id: number) => void;
  selected: number;
  plans: Plan[];
}

const PlanList: React.FC<PlanListProps> = ({ onSelect, selected, plans }) => {
  const location = useLocation();
  const [category, setCategory] = useState<Plan[]>(plans);
  const [categoryType, setCategoryType] = useState<string>('일반');

  const handleCategory = (categoryType: string) => {
    const filteredPlans = plans.filter((plan) => plan.CATEGORY === categoryType);
    setCategory(filteredPlans);
    setCategoryType(categoryType);
  };

  return (
    <>
      <ul className="flex flex-col px-3 py-2  gap-1 ml-20">
        <p className="font-bold text-lg md:text-xxl flex items-center">
          정렬 기준
          <Button
            variant={categoryType === '일반' ? 'fill' : 'outline'}
            size="sm"
            className="ml-5 text-lm md:text-"
            onClick={() => handleCategory('일반')}
          >
            일반
          </Button>
          <Button
            variant={categoryType === '유쓰' ? 'fill' : 'outline'}
            size="sm"
            className="ml-2 text-lm"
            onClick={() => handleCategory('유쓰')}
          >
            유쓰
          </Button>
          <Button
            variant={categoryType === '청소년' ? 'fill' : 'outline'}
            size="sm"
            className="ml-2 text-lm"
            onClick={() => handleCategory('청소년')}
          >
            청소년
          </Button>
          <Button
            variant={categoryType === '시니어' ? 'fill' : 'outline'}
            size="sm"
            className="ml-2 text-lm"
            onClick={() => handleCategory('시니어')}
          >
            시니어
          </Button>
        </p>
        {location.pathname === '/signup' && (
          <li
            key="recommended"
            className={`py-2 cursor-pointer text-sm ${
              selected === 0 ? 'text-gray-900 font-bold' : 'text-gray-700'
            }`}
            onClick={() => onSelect(0)}
          >
            사용중인 요금제를 잘 모르신다면, 유메이트가 추천하는 요금제를 추천!
            {selected === 0 && <span className="float-right text-pink-500">✔</span>}
          </li>
        )}
        {category &&
          category.map((plan: Plan) => (
            <li
              key={plan.PLAN_ID}
              className={`py-2 cursor-pointer text-sm md:text-lg ${
                selected === plan.PLAN_ID ? 'text-pink-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => onSelect(plan.PLAN_ID)}
            >
              {plan.PLAN_NAME}
              {selected === plan.PLAN_ID && <span className="text-pink-500 ml-5">✔</span>}
            </li>
          ))}
      </ul>
    </>
  );
};

export default PlanList;
