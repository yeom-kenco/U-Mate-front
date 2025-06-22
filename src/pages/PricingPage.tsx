import { useEffect, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeModal, openModal } from '../store/modalSlice';
import { useToast } from '../hooks/useToast';

import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import AgeRangeList from '../components/BottomSheet/AgeRangeList';
import PlanCard from '../components/PlanCard';
import FilterButton from '../components/FilterButton';
// import FilterModal from '../components/Modal/FilterModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import LoginBanner from '../components/LoginBanner';
import Button from '../components/Button';

// 요금제 목데이터
import { data } from '../data/plansMockData';

const PricingPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [sortOpen, setSortOpen] = useState(false); // 정렬 시트 토글
  const [ageOpen, setAgeOpen] = useState(false); // 연령 시트 토글
  const [isSorted, setIsSorted] = useState(''); // 선택된 정렬 기준
  const [ageRanges, SetAgeRanges] = useState(''); // 선택된 연령 기준
  const [selectedPlan, setSelectedPlan] = useState(null); // 변경할 요금제
  const [visibleCount, setVisibleCount] = useState(3); // 초반에 요금제 3개만 보여주기

  const [modalType, setModalType] = useState<'compare' | 'filter' | 'change' | null>(null); // 모달 타입 정의

  const toast = useToast();
  const navigate = useNavigate();

  // 모달 상태 관리
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.modal.isOpen);

  // 필터 선택 모달 열기
  const openFilterModal = () => {
    setModalType('filter');
    dispatch(openModal());
  };

  // 필터 선택 모달 닫기
  const closeFilterModal = () => {
    dispatch(closeModal());
  };

  // 비교하기 모달 열기
  const openCompareModal = (e: React.MouseEvent, plan) => {
    e.stopPropagation();
    setSelectedPlan(plan);
    console.log(plan);
    setModalType('compare');
    dispatch(openModal());
  };

  // 비교하기 버튼 (비교함으로 이동) 로직
  const handleComparePlans = () => {
    setModalType('compare');
    dispatch(closeModal());
    navigate('/', { state: { plan: selectedPlan } });
  };

  // 비교하기 모달 닫기
  const closeCompareModal = () => {
    dispatch(closeModal());
  };

  // 변경하기 모달 열기
  const openChangeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalType('change');
    dispatch(openModal());
  };

  // 변경하기 확인 버튼 로직 (사용자 요금제 변경 필요)
  const handleChangePlans = () => {
    setModalType('change');
    toast?.showToast('해당 요금제로 변경되었습니다', 'black');
    dispatch(closeModal());
  };

  // 변경하기 모달 닫기
  const closeChangeModal = () => {
    dispatch(closeModal());
  };

  // 정렬 기준 선택 시
  const handleSortSelect = (value: string) => {
    setIsSorted(value);
    setSortOpen(false);
  };

  // 연령대 선택 시
  const handleAgeSelect = (value: string) => {
    if (value === '전체') {
      SetAgeRanges('');
    } else {
      SetAgeRanges(value);
    }

    setAgeOpen(false);
  };

  // 정렬 & 연령별 필터링 로직
  const getSortedPlans = () => {
    const filtered = ageRanges ? data.filter((plan) => plan.AGE_GROUP === ageRanges) : [...data];

    switch (isSorted) {
      case '높은 가격순':
        return filtered.sort((a, b) => b.MONTHLY_FEE - a.MONTHLY_FEE);
      case '낮은 가격순':
        return filtered.sort((a, b) => a.MONTHLY_FEE - b.MONTHLY_FEE);
      case '리뷰 많은 순':
        return filtered.sort((a, b) => b.REVIEW_USER_COUNT - a.REVIEW_USER_COUNT);
      default:
        // 인기순(평점 높은 순) 리뷰가 0개일 때는 평점 0으로 처리
        return filtered.sort((a, b) => {
          const scoreA =
            a.REVIEW_USER_COUNT === 0 ? 0 : a.RECEIVED_STAR_COUNT / a.REVIEW_USER_COUNT;
          const scoreB =
            b.REVIEW_USER_COUNT === 0 ? 0 : b.RECEIVED_STAR_COUNT / b.REVIEW_USER_COUNT;
          return scoreB - scoreA;
        });
    }
  };

  const sortedPlans = getSortedPlans();

  // 페이지네이션 로직
  const handleLoadMore = () => {
    if (visibleCount >= data.length) {
      toast?.showToast(`더 이상 요금제가 없어요`, 'black');
      return;
    }

    setVisibleCount((prev) => Math.min(prev + 3, data.length));
  };

  // 요금제명 클릭 시 상세 페이지로 이동
  const goToDetailPage = () => {
    navigate('/');
  };

  useEffect(() => {
    setHeaderConfig({
      title: '요금제',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  return (
    <>
      {/* 만약 사용자가 로그인 상태가 아니라면 배너 띄우기 */}
      <LoginBanner type="default" />
      <div className="h-full px-4 md:px-10">
        {/* 필터 영역 */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex gap-6 text-m">
            <button onClick={() => setSortOpen(true)} className="flex items-center gap-2">
              {isSorted || '인기순'} {sortOpen ? <SlArrowUp /> : <SlArrowDown />}
            </button>
            <button onClick={() => setAgeOpen(true)} className="flex items-center gap-2">
              {ageRanges || '전체'} {ageOpen ? <SlArrowUp /> : <SlArrowDown />}
            </button>
          </div>

          <div className="ml-auto">
            <FilterButton onClick={openFilterModal} />
          </div>
        </div>
        {/* 요금제 카드 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-4">
          {sortedPlans.slice(0, visibleCount).map((plan) => (
            <PlanCard
              key={plan.PLAN_ID}
              name={plan.PLAN_NAME}
              description={plan.DATA_INFO}
              price={`${plan.MONTHLY_FEE.toLocaleString()}`}
              discountedPrice={`${plan.MONTHLY_FEE * 0.75}`}
              rating={{
                score: +(plan.RECEIVED_STAR_COUNT / plan.REVIEW_USER_COUNT).toFixed(1),
                count: plan.REVIEW_USER_COUNT,
              }}
              size="large"
              onCompareClick={(e) => openCompareModal(e, plan)}
              onChangeClick={openChangeModal}
              onClick={goToDetailPage}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-20">
          <Button
            variant="outline"
            color="gray"
            size="xl"
            rounded="full"
            onClick={handleLoadMore}
            className="md:w-96"
          >
            요금제 더보기 ({visibleCount}/{data.length})
          </Button>
        </div>
        <BottomSheet isOpen={sortOpen} onClose={() => setSortOpen(false)} height="300px">
          <SortList onSelect={handleSortSelect} selected={isSorted} />
        </BottomSheet>
        <BottomSheet isOpen={ageOpen} onClose={() => setAgeOpen(false)} height="350px">
          <AgeRangeList onSelect={handleAgeSelect} selected={ageRanges} />
        </BottomSheet>
        {/* 변경하기 모달 (만약 현재 사용하고 있는 요금제가 없다면 신청하기로 띄우기?) */}
        {modalType === 'change' && isOpen && (
          <ConfirmModal
            title="해당 요금제로 변경하시겠습니까?"
            onConfirm={handleChangePlans}
            onClose={closeChangeModal}
          />
        )}
        {/* 비교하기 모달 */}
        {modalType === 'compare' && isOpen && (
          <ConfirmModal
            title="선택한 요금제가 비교함에 추가되었어요!"
            subtitle="지금 비교함으로 가보시겠어요?"
            confirmText="이동"
            onConfirm={handleComparePlans}
            onClose={closeCompareModal}
          />
        )}
        {/* {modalType === 'filter' && isOpen && (
          <FilterModal
            onClose={closeFilterModal}
            onSelect={closeFilterModal}
            onReset={closeFilterModal}
          />
        )} */}
      </div>
    </>
  );
};

export default PricingPage;
