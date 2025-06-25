import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import Button from '../Button';
import BaseModal from '../Modal/BaseModal';

interface PlanBottomBarProps {
  planId: number;
  planName: string;
  price: number;
  discountedPrice: number;
}

const PlanBottomBar = ({ planId, planName, price, discountedPrice }: PlanBottomBarProps) => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    const res = await fetch(`https://seungwoo.i234.me:3333/tokenCheck`, {
      method: 'GET',
      credentials: 'include',
    });
    const isLoggedIn = res.ok;

    if (!isLoggedIn) {
      showToast('로그인 후 이용 가능합니다.', 'black', 'bottom-center', { bottom: '230px' });
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://seungwoo.i234.me:3333/changeUserPlan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newPlanId: planId }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('해당 요금제가 신청되었습니다.', 'violet');
      } else {
        showToast(data.message || '신청 실패', 'error');
      }
    } catch {
      showToast('요금제 신청 중 오류 발생', 'error');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="w-full px-4">
        {/* lg 이상일 때는 가로 배치, 이하일 때는 세로 배치 */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-end lg:px-44 lg:justify-end lg:gap-12">
          {/* 좌측: 가격 정보 */}
          <div className="flex flex-col gap-1 w-full lg:w-96">
            <div className="flex justify-between items-center w-full">
              <p className="text-black font-semibold text-lm">월정액</p>
              <p className="text-pink-500 font-bold text-lg">월 {price.toLocaleString()}원</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-black font-semibold text-lm">약정 할인 시</p>
              <p className="text-black font-extrabold text-lg">
                월 {discountedPrice.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 우측: 버튼 영역 */}
          <div className="flex w-full lg:w-fit gap-2">
            <Button
              variant="outline"
              color="gray"
              size="xl"
              rounded="2xl"
              onClick={() => navigate('/compare')}
              className="rounded-lg w-[100px]"
            >
              비교
            </Button>
            <Button
              variant="fill"
              color="pink"
              size="xl"
              rounded="2xl"
              onClick={handleRequest}
              className="rounded-lg w-full lg:w-[250px]"
            >
              신청하기
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BaseModal onClose={() => setIsModalOpen(false)}>
          <div className="px-6 py-5 flex flex-col gap-4 text-center">
            <p className="text-base font-semibold">해당 요금제를 신청하시겠습니까?</p>
            <p className="text-sm text-gray-500">기존 요금제에서 변경됩니다.</p>
            <div className="flex gap-2 justify-center mt-2">
              <Button
                variant="outline"
                color="gray"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                variant="fill"
                color="pink"
                size="sm"
                onClick={handleConfirmRequest}
                disabled={isLoading}
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

export default PlanBottomBar;
