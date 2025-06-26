import React from 'react';

// 📌사용법
// benefitList 중에서 특정 순서의 항목만 골라서 보여주고 싶을때
/* 
const selectedIndexes = [0, 5, 7];

{selectedIndexes.map((idx) => {
  const item = benefitList[idx];
  return (
    <BenefitItem key={idx} title={item.title} description={item.description} icon={item.icon} />
  );
})}
*/

interface BenefitItemProps {
  title: string;
  description: string[];
  icon: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description, icon }) => {
  return (
    <div className="flex items-start gap-5 mb-8">
      <img src={icon} alt={title} className="w-16 h-16 object-contain mt-1" />
      <div>
        <h3 className="font-semibold text-m mb-1 lg:text-lm">{title}</h3>
        <ul className="list-disc list-outside pl-4 pr-2 text-s text-zinc-600 space-y-1 lg:text-m">
          {description.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BenefitItem;
