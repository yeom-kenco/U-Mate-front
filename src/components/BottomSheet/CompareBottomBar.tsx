import { useState, useContext } from 'react';
import PlanBottomSheet from './PlanBottomSheet';
import Button from '../Button';
import BaseModal from '../Modal/BaseModal';
import { ToastContext } from '../../context/ToastContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUserPlan } from '../../store/userSlice';
import axiosInst from '../../apis/axiosInst';

interface CompareBottomBarProps {
  plan1Id: number;
  plan2Id: number;
}

const CompareBottomBar = ({ plan1Id, plan2Id }: CompareBottomBarProps) => {
  const [bottomOpen, setBottomOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useContext(ToastContext)!;
  const user = useSelector((state: RootState) => state.user);

  const handleRequest = async (planId: number) => {
    const res = await fetch(`https://seungwoo.i234.me:3333/tokenCheck`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      showToast('로그인 후 이용 가능한 서비스입니다.', 'error', 'bottom-center', {
        bottom: '220px',
      });
      return;
    }

    setSelectedPlanId(planId);
    setBottomOpen(false);
  };

  const handleConfirmRequest = async () => {
    if (!selectedPlanId) return;
    setIsLoading(true);

    try {
      const csrfRes = await axiosInst.get('/csrf-token');
      const csrfToken = csrfRes.data.csrfToken;

      const res = await axiosInst.post(
        '/changeUserPlan',
        {
          userId: user.id,
          newPlanId: selectedPlanId,
        },
        {
          headers: { 'X-CSRF-TOKEN': csrfToken },
        }
      );

      const data = res.data;
      if (data.success) {
        dispatch(updateUserPlan(selectedPlanId));
        showToast('해당 요금제가 신청되었습니다.', 'violet', 'bottom-center', {
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
    } finally {
      setIsLoading(false);
      setSelectedPlanId(null);
    }
  };

  return (
    <>
      <PlanBottomSheet
        isOpen={bottomOpen}
        onClose={() => setBottomOpen(false)}
        onOpen={() => setBottomOpen(true)}
        heightClass="h-[120px] lg:h-[150px]"
      >
        <div className="w-full flex gap-4 md:gap-9 justify-center items-center">
          <Button
            variant="fill"
            color="pink"
            size="xl"
            rounded="2xl"
            onClick={() => handleRequest(plan1Id)}
            className="w-full max-w-[430px] text-white font-bold text-base"
          >
            요금제1 신청
          </Button>
          <Button
            variant="fill"
            color="pink"
            size="xl"
            rounded="2xl"
            onClick={() => handleRequest(plan2Id)}
            className="w-full max-w-[430px] text-white font-bold text-base"
          >
            요금제2 신청
          </Button>
        </div>
      </PlanBottomSheet>

      {selectedPlanId && (
        <BaseModal onClose={() => setSelectedPlanId(null)}>
          <div className="px-6 py-7 flex flex-col gap-4 text-center">
            <p className="text-base font-semibold">해당 요금제를 신청하시겠습니까?</p>
            <p className="text-sm text-gray-500">기존 요금제에서 변경됩니다.</p>
            <div className="flex gap-2 justify-center mt-2">
              <Button
                variant="outline"
                color="gray"
                size="xl"
                onClick={() => setSelectedPlanId(null)}
                className="w-full flex-1"
              >
                취소
              </Button>
              <Button
                variant="fill"
                color="pink"
                size="xl"
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
    </>
  );
};

export default CompareBottomBar;
