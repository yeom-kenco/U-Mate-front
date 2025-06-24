import React from 'react';
import PlanCardSmall from './PlanCardSmall';
import PlanCardLarge from './PlanCardLarge';

export interface PlanCardProps {
  name: string;
  description: string;
  dataInfo?: string;
  shareInfo?: string;
  price: string;
  discountedPrice?: string;
  rating?: {
    score: number;
    count: number;
  };
  highlight?: boolean;
  showButtons?: boolean;
  onChangeClick?: (e: React.MouseEvent) => void;
  onCompareClick?: (e: React.MouseEvent) => void;
  onClick: () => void;
  size?: 'small' | 'large'; // 대표페이지(small) ,요금제페이지(large)
}

const PlanCard: React.FC<PlanCardProps> = (props) => {
  const { size = 'small' } = props;

  if (size === 'large') {
    return <PlanCardLarge {...props} />;
  } else {
    return <PlanCardSmall {...props} />;
  }
};

export default PlanCard;
