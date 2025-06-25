import React from 'react';

interface PlanListProps {
  onSelect: (id: number) => void;
  selected: number;
  plans: Plan[];
}

interface Plan {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  CALL_INFO: string;
  CALL_INFO_DETAIL: string;
  DATA_INFO: string;
  DATA_INFO_DETAIL: string;
  SHARE_DATA: string;
  SMS_INFO: string;
  USER_COUNT: number;
  RECEIVED_STAR_COUNT: string;
  REVIEW_USER_COUNT: number;
  AGE_GROUP: string;
}

const PlanList: React.FC<PlanListProps> = ({ onSelect, selected, plans }) => {
  return (
    <ul className="flex flex-col px-3 py-2  gap-1">
      <p className="font-bold text-lg">정렬 기준</p>
      {plans &&
        plans.map((plan: Plan) => (
          <li
            key={plan.PLAN_ID}
            className={`py-2 cursor-pointer text-sm ${
              selected === plan.PLAN_ID ? 'text-gray-900 font-bold' : 'text-gray-700'
            }`}
            onClick={() => onSelect(plan.PLAN_ID)}
          >
            {plan.PLAN_NAME}
            {selected === plan.PLAN_ID && <span className="float-right text-pink-500 ">✔</span>}
          </li>
        ))}
    </ul>
  );
};

export default PlanList;
