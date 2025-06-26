import React, { useEffect, useState, useContext } from 'react';
import DropdownSelector from '../components/DropdownSelector';
import { getPlanList, getPlanDetail, updatePlan } from '../apis/planApi';
import PlanList from '../components/BottomSheet/PlanList';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import PlanCompare from '../components/PlanCompare';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import BaseModal from '../components/Modal/BaseModal';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateUserPlan } from '../store/userSlice';
import axiosInst from '../apis/axiosInst';
import { ToastContext } from '../context/ToastContext';
import CompareBottomBar from '../components/BottomSheet/CompareBottomBar';
import { Plan, PlanDetail } from '../types/plan';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const rawPlan1 = Number(searchParams.get('plan1'));
  const rawPlan2 = Number(searchParams.get('plan2'));

  const plan1Default = rawPlan1 || 1;
  const plan2Default = rawPlan2 || 2;

  const [plan1Id, setPlan1Id] = useState<number>(plan1Default);
  const [plan2Id, setPlan2Id] = useState<number>(plan2Default);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [plan1Detail, setPlan1Detail] = useState<PlanDetail>();
  const [plan2Detail, setPlan2Detail] = useState<PlanDetail>();
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useContext(ToastContext)!;

  useEffect(() => {
    setHeaderConfig({
      title: '요금제 비교',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, [setHeaderConfig]);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await getPlanList();
      if (response.success) {
        setPlans(response.data);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await getPlanDetail(plan1Id);
      if (response.success) {
        setPlan1Detail({ ...response.data.plan, benefits: response.data.benefits });
      }
    };
    if (plan1Id) fetchDetail();
  }, [plan1Id]);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await getPlanDetail(plan2Id);
      if (response.success) {
        setPlan2Detail({ ...response.data.plan, benefits: response.data.benefits });
      }
    };
    if (plan2Id) fetchDetail();
  }, [plan2Id]);

  const handleRequest = async (planId: number) => {
    const res = await fetch(`https://seungwoo.i234.me:3333/tokenCheck`, {
      method: 'GET',
      credentials: 'include',
    });
    const isLoggedIn = res.ok;

    if (!isLoggedIn) {
      showToast('로그인 후 이용 가능한 서비스입니다.', 'error', 'bottom-center', {
        bottom: '220px',
      });
      return;
    }

    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  const handleConfirmRequest = async () => {
    if (!selectedPlanId) return;
    setIsLoading(true);
    try {
      const res = await updatePlan({
        userId: user.id,
        newPlanId: selectedPlanId,
      });

      const data = res.data;
      if (data.success) {
        dispatch(updateUserPlan(selectedPlanId));
        showToast('해당 요금제가 변경되었습니다.', 'violet', 'bottom-center', {
          bottom: '220px',
        });
      } else {
        showToast(data.message || '신청 실패', 'error', 'bottom-center', {
          bottom: '220px',
        });
      }
    } catch (err) {
      showToast('요금제 신청 중 오류가 발생했습니다.', 'error', 'bottom-center', {
        bottom: '220px',
      });
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="px-4 lg:px-20 md:mx-auto bg-white min-h-screen mt-11 pb-32">
      {plans.length > 0 && (
        <div className="flex w-full gap-4 items-start">
          <div className="w-1/2 flex-col items-stretch">
            <PlanCompare
              count={1}
              plans={plans}
              planDetail={plan1Detail}
              comparePlan={undefined}
              setPlanId={setPlan1Id}
            />
          </div>
          <div className="w-1/2 flex-col items-stretch">
            <PlanCompare
              count={2}
              plans={plans}
              planDetail={plan2Detail}
              comparePlan={plan1Detail}
              setPlanId={setPlan2Id}
            />
          </div>
        </div>
      )}

      <CompareBottomBar plan1Id={plan1Id} plan2Id={plan2Id} />

      {isModalOpen && (
        <BaseModal onClose={() => setIsModalOpen(false)}>
          <div className="px-6 py-7 flex flex-col gap-4 text-center">
            <p className="text-base font-semibold">해당 요금제를 신청하시겠습니까?</p>
            <p className="text-sm text-gray-500">기존 요금제에서 변경됩니다.</p>
            <div className="flex gap-2 justify-center mt-2">
              <Button
                variant="outline"
                color="gray"
                size="lg"
                onClick={() => setIsModalOpen(false)}
                className="w-full flex-1"
              >
                취소
              </Button>
              <Button
                variant="fill"
                color="pink"
                size="lg"
                onClick={handleConfirmRequest}
                disabled={isLoading}
                className="w-full flex-1"
              >
                {isLoading ? '신청 중...' : '신청'}
              </Button>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default Compare;
