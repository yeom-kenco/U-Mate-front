import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import Button from '../Button';
import BaseModal from '../Modal/BaseModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axiosInst from '../../apis/axiosInst';
import { useDispatch } from 'react-redux';
import { updateUserPlan } from '../../store/userSlice';

interface PlanBottomBarProps {
  planId: number;
  planName: string;
  price: number;
  discountedPrice: number;
}

const PlanBottomBar = ({ planId, price, discountedPrice }: PlanBottomBarProps) => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  // ✅ 비교 버튼 클릭 시
  const handleCompareClick = () => {
    const params = new URLSearchParams();
    if (user?.plan) params.append('plan1', String(user.plan));
    params.append('plan2', String(planId));
    navigate(`/compare?${params.toString()}`);
  };

  // ✅ 신청 버튼 클릭 시
  const handleRequest = async () => {
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

    setIsModalOpen(true);
  };

  // ✅ 요금제 변경 확정 클릭
  const handleConfirmRequest = async () => {
    setIsLoading(true);
    try {
      // 1. CSRF 토큰 먼저 요청
      const csrfRes = await axiosInst.get('/csrf-token');
      const csrfToken = csrfRes.data.csrfToken;

      // 2. 요금제 변경 POST 요청 (axios로 변경)
      const res = await axiosInst.post(
        '/changeUserPlan',
        {
          userId: user.id, // 기존 값 유지
          newPlanId: planId,
        },
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken, // CSRF 토큰 포함
          },
        }
      );

      const data = res.data;
      if (data.success) {
        dispatch(updateUserPlan(planId));
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
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="w-full px-4">
        {/* lg 이상일 때는 가로 배치, 이하일 때는 세로 배치 */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-end lg:justify-between lg:px-10">
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
          <div className="flex flex-1 w-full lg:w-fit gap-2">
            <Button
              variant="outline"
              color="gray"
              size="xl"
              rounded="2xl"
              onClick={handleCompareClick}
              className="rounded-lg w-[100px] lg:h-[70px] lg:mb-1 g:w-full"
            >
              비교
            </Button>
            <Button
              variant="fill"
              color="pink"
              size="xl"
              rounded="2xl"
              onClick={handleRequest}
              className="rounded-lg w-full lg:w-[250px] lg:h-[70px] lg:mb-1 lg:flex-1"
            >
              신청하기
            </Button>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default PlanBottomBar;
