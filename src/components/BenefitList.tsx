import React from 'react';
import { benefitList } from '../data/benefits';
import BenefitItem from './BenefitItem';

const BenefitList = () => {
  return (
    <section className="px-4 py-6">
      {benefitList.map((item, idx) => (
        <BenefitItem key={idx} title={item.title} description={item.description} icon={item.icon} />
      ))}
    </section>
  );
};

export default BenefitList;
