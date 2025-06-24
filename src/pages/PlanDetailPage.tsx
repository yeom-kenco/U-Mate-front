// pages/PlanDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanTopBanner from '../components/PlanDetail/PlanTopBanner';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';

const PlanDetailPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  // 요금제 상세 페이지용 헤더 설정
  useEffect(() => {
    setHeaderConfig({
      title: '요금제 상세',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, [setHeaderConfig]);
  const { id } = useParams();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      const res = await fetch(`https://seungwoo.i234.me:3333/planDetail/${id}`);
      const json = await res.json();
      if (json.success) {
        setPlan(json.data.plan);
      }
    };

    fetchPlanDetail();
  }, [id]);

  if (!plan) return <div>로딩 중...</div>;

  const discounted = calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME);

  return (
    <div>
      <PlanTopBanner
        planName={plan.PLAN_NAME}
        monthlyFee={plan.MONTHLY_FEE}
        dataInfo={plan.DATA_INFO}
        shareData={plan.SHARE_DATA}
        callInfo={plan.CALL_INFO}
        smsInfo={plan.SMS_INFO}
        starRating={parseFloat(plan.RECEIVED_STAR_COUNT)}
        isPopular={plan.PLAN_NAME.includes('프리미어')}
        discountedPrice={discounted}
      />
    </div>
  );
};

export default PlanDetailPage;
