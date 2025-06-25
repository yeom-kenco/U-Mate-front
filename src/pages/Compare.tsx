import React, { useEffect, useState } from 'react';
import DropdownSelector from '../components/DropdownSelector';
import { getPlanList, getPlanDetail, changePlanApi } from '../apis/planApi';
import PlanList from '../components/BottomSheet/PlanList';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import PlanCompare from '../components/PlanCompare';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';

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

interface PlanDetail {
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
  benefits: Benefit[];
}

interface Benefit {
  BENEFIT_ID: number;
  NAME: string;
  TYPE: string;
}

const Compare = ({ plan1, plan2 }: { plan1: number; plan2: number }) => {
  const [plan1Id, setPlan1Id] = useState<number>(plan1);
  const [plan2Id, setPlan2Id] = useState<number>(plan2);
  const [plans, setPlans] = useState<Plan[]>();
  const [plan1Detail, setPlan1Detail] = useState<PlanDetail>();
  const [plan2Detail, setPlan2Detail] = useState<PlanDetail>();
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  useEffect(() => {
    const response = async () => {
      const response = await getPlanList();
      if (response.success) {
        setPlans(response.data);
      }
    };
    response();
  }, []);

  useEffect(() => {
    const detailResponse = async () => {
      const detailResponse = await getPlanDetail(plan1Id);
      if (detailResponse.success) {
        setPlan1Detail({ ...detailResponse.data.plan, benefits: detailResponse.data.benefits });
      }
    };
    detailResponse();
  }, [plan1Id]);

  useEffect(() => {
    const detailResponse = async () => {
      const detailResponse = await getPlanDetail(plan2Id);
      if (detailResponse.success) {
        setPlan2Detail({ ...detailResponse.data.plan, benefits: detailResponse.data.benefits });
      }
    };
    detailResponse();
  }, [plan2Id]);

  useEffect(() => {
    setHeaderConfig({
      title: '요금제 비교',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, [setHeaderConfig]);

  const changePlan = async (planId: number) => {
    const userId = 1;
    const response = await changePlanApi(userId, planId);

    alert(response.success ? response.message : response.error);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white min-h-screen pb-32">
      {plans && (
        <div className="flex justify-center gap-4">
          <PlanCompare
            count={1}
            plans={plans || []}
            planDetail={plan1Detail}
            comparePlan={plan2Detail}
            setPlanId={setPlan1Id}
          />
          <PlanCompare
            count={2}
            plans={plans || []}
            planDetail={plan2Detail}
            comparePlan={plan1Detail}
            setPlanId={setPlan2Id}
          />
        </div>
      )}

      {/* 화면 하단 고정 신청 버튼들 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-2xl rounded-t-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <button
              className="flex-1 bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg"
              onClick={() => changePlan(plan1Id)}
            >
              요금제1 신청
            </button>
            <button
              className="flex-1 bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg"
              onClick={() => changePlan(plan2Id)}
            >
              요금제2 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
