import { useEffect, useState } from 'react';
import DropdownSelector from './DropdownSelector';
import BottomSheet from './BottomSheet/BottomSheet';
import PlanList from './BottomSheet/PlanList';
import { getPlanDetail } from '../apis/planApi';
import { formatCurrency } from '../utils/formatNumber';
import { Link } from 'react-router-dom';

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

const PlanCompare = ({
  count,
  plans,
  planDetail,
  comparePlan,
  setPlanId,
}: {
  count: number;
  plans: Plan[];
  planDetail: PlanDetail | undefined;
  comparePlan: PlanDetail | undefined;
  setPlanId: (id: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handlePlanClick = () => {
    setIsOpen(true);
  };

  const [plan, setPlan] = useState<string[]>([]);
  const [isChanged, setIsChanged] = useState<boolean[]>([]);

  useEffect(() => {
    const p: string[] = [];

    p.push(formatCurrency(planDetail?.MONTHLY_FEE || 0));
    p.push(
      formatCurrency(
        Math.floor(
          Number(planDetail?.MONTHLY_FEE || 0) * 0.85 -
            (planDetail?.benefits.filter((e) => e.BENEFIT_ID === 18).length === 1 ? 5250 : 0)
        )
      )
    );
    p.push(formatCurrency(Math.floor(Number(planDetail?.MONTHLY_FEE || 0) * 0.15)));
    p.push(
      planDetail?.benefits.filter((e) => e.BENEFIT_ID === 18).length === 1
        ? '월 5,250원'
        : '해당 없음'
    );
    p.push(planDetail?.DATA_INFO || '');
    p.push(planDetail?.DATA_INFO_DETAIL || '');
    p.push(planDetail?.SHARE_DATA || '');
    p.push(planDetail?.CALL_INFO || '');
    p.push(planDetail?.CALL_INFO_DETAIL || '');
    p.push(planDetail?.SMS_INFO || '');
    p.push(
      String(planDetail?.benefits.filter((e) => e.TYPE === '필터링혜택(프리미엄)')?.length || 0)
    );
    p.push(
      String(planDetail?.benefits.filter((e) => e.TYPE === '필터링혜택(미디어)')?.length || 0)
    );
    p.push(
      planDetail?.benefits.filter((e) => e.BENEFIT_ID === 20 || e.BENEFIT_ID === 21)[0]?.NAME || ''
    );

    setPlan(p);
  }, [planDetail]);

  useEffect(() => {
    const p: boolean[] = [];

    p.push(comparePlan !== undefined && comparePlan?.MONTHLY_FEE !== planDetail?.MONTHLY_FEE);
    p.push(
      comparePlan !== undefined &&
        Math.floor(
          Number(comparePlan?.MONTHLY_FEE || 0) * 0.85 -
            (comparePlan?.benefits.filter((e) => e.BENEFIT_ID === 18).length === 1 ? 5250 : 0)
        ) !==
          Math.floor(
            Number(planDetail?.MONTHLY_FEE || 0) * 0.85 -
              (planDetail?.benefits.filter((e) => e.BENEFIT_ID === 18).length === 1 ? 5250 : 0)
          )
    );
    p.push(
      comparePlan !== undefined &&
        Math.floor(Number(comparePlan?.MONTHLY_FEE || 0) * 0.15) !==
          Math.floor(Number(planDetail?.MONTHLY_FEE || 0) * 0.15)
    );
    p.push(
      comparePlan !== undefined &&
        comparePlan?.benefits.filter((e) => e.BENEFIT_ID === 18).length !==
          planDetail?.benefits.filter((e) => e.BENEFIT_ID === 18).length
    );
    p.push(comparePlan !== undefined && comparePlan?.DATA_INFO !== planDetail?.DATA_INFO);
    p.push(
      comparePlan !== undefined && comparePlan?.DATA_INFO_DETAIL !== planDetail?.DATA_INFO_DETAIL
    );
    p.push(comparePlan !== undefined && comparePlan?.SHARE_DATA !== planDetail?.SHARE_DATA);
    p.push(comparePlan !== undefined && comparePlan?.CALL_INFO !== planDetail?.CALL_INFO);
    p.push(
      comparePlan !== undefined && comparePlan?.CALL_INFO_DETAIL !== planDetail?.CALL_INFO_DETAIL
    );
    p.push(comparePlan !== undefined && comparePlan?.SMS_INFO !== planDetail?.SMS_INFO);
    p.push(
      comparePlan !== undefined &&
        comparePlan?.benefits.filter((e) => e.TYPE === '필터링혜택(프리미엄)')?.length !==
          planDetail?.benefits.filter((e) => e.TYPE === '필터링혜택(프리미엄)')?.length
    );
    p.push(
      comparePlan !== undefined &&
        comparePlan?.benefits.filter((e) => e.TYPE === '필터링혜택(미디어)')?.length !==
          planDetail?.benefits.filter((e) => e.TYPE === '필터링혜택(미디어)')?.length
    );
    p.push(
      comparePlan !== undefined &&
        comparePlan?.benefits.filter((e) => e.BENEFIT_ID === 20 || e.BENEFIT_ID === 21)[0]?.NAME !==
          planDetail?.benefits.filter((e) => e.BENEFIT_ID === 20 || e.BENEFIT_ID === 21)[0]?.NAME
    );
    setIsChanged(p);
  }, [planDetail, comparePlan]);

  return (
    <div className="gap-4 mb-2 h-full flex flex-col justify-between leading-relaxed">
      <div className="flex-1 min-h-[100px]">
        <DropdownSelector
          label={`선택한 요금제 ${count}`}
          plan={planDetail?.PLAN_NAME || ''}
          onClick={handlePlanClick}
        />
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        height="700px"
      >
        <PlanList
          onSelect={(id: number) => {
            setIsOpen(false);
            setPlanId(id);
          }}
          selected={0}
          plans={plans || []}
        />
      </BottomSheet>

      {/* 비교 테이블 */}
      <div className="bg-white rounded-lg overflow-hidden">
        {/* 월정액 */}
        <div className="border-b border-gray-100 p-4 min-h-32 max-h-32">
          <div className="items-center mb-2">
            <span className="text-s sm:text-sm md:text-lm text-gray-600 lg:text-lm">월정액</span>
            <span className="max-[400px]:text-[8px] min-[400px]:text-xs md:text-m ml-2 text-gray-500">
              부가세 포함 금액
            </span>
          </div>
          <div className="flex justify-between">
            <div className="text-left">
              <span
                className={`lg:text-xl md:text-lg text-m font-bold ${isChanged[0] ? 'text-pink-500' : ''}`}
              >
                {plan[0]}
              </span>
              <div className="text-xs text-gray-500 lg:text-sm">정상가</div>
            </div>
          </div>
        </div>

        {/* 최종 예상 할인 적용가 */}
        <div className="border-b border-gray-100 p-4 min-h-32 max-h-32">
          <div className="text-s sm:text-sm md:text-lm text-gray-600 mb-2">
            최종 예상 할인 적용가
          </div>
          <div className="flex justify-between">
            <span
              className={`lg:text-xl md:text-lg text-m font-bold ${isChanged[1] ? 'text-pink-500' : ''}`}
            >
              월 {plan[1]}
            </span>
          </div>
        </div>

        {/* 선택 약정 할인 */}
        <div className="p-4 min-h-32 max-h-32">
          <div className="flex justify-between items-center mb-2">
            <span className="text-s sm:text-sm md:text-lm text-gray-600">선택 약정 할인</span>
          </div>
          <div className="flex justify-between">
            <div className="text-left">
              <span
                className={`lg:text-xl md:text-lg text-m font-bold ${isChanged[2] ? 'text-pink-500' : ''}`}
              >
                월 {plan[2]}
              </span>
              <div className="lg:text-sm text-xs text-gray-500">24개월</div>
            </div>
          </div>
        </div>

        {/* 프리미어 요금제 약정 할인 */}
        <div className="border-b border-gray-100 px-4 min-h-32 max-h-32 mt-6 pb-6">
          <div className="text-s sm:text-sm md:text-lm text-gray-600 mb-2">
            프리미어 요금제 약정 할인
          </div>
          <div className="flex justify-between">
            <div className="text-left">
              <span
                className={`lg:text-xl md:text-lg text-m font-bold ${isChanged[3] ? 'text-pink-500' : ''}`}
              >
                {plan[3]}
              </span>
              <div className="lg:text-sm text-xs text-gray-500">24개월</div>
            </div>
          </div>
        </div>

        {/* 데이터 */}
        <div className="border-b border-gray-100 p-4 min-h-32 max-h-32">
          <div className="text-s sm:text-sm md:text-lm text-gray-600 mb-2">데이터</div>
          <div className="flex justify-between">
            <div className="text-left">
              <span
                className={`lg:text-xl md:text-lg text-m font-bold ${isChanged[4] ? 'text-pink-500' : ''}`}
              >
                {plan[4]}
              </span>
              <div
                className={`lg:text-s text-xs text-gray-500 ${isChanged[5] ? 'text-pink-500' : ''}`}
              >
                {plan[5]}
              </div>
            </div>
          </div>
        </div>

        {/* 추가데이터 */}
        <div className="border-b border-gray-100 p-4 min-h-32 max-h-32">
          <div className="text-s sm:text-sm md:text-lm text-gray-600 mb-2">추가데이터</div>
          <div className="flex justify-between">
            <span className={`lg:text-m text-sm ${isChanged[6] ? 'text-pink-500' : ''}`}>
              {plan[6]}
            </span>
          </div>
        </div>

        {/* 음성통화 */}
        <div className="border-b border-gray-100 p-4 min-h-32 max-h-32">
          <div className="text-s sm:text-sm md:text-lm text-gray-600 mb-2">음성통화</div>
          <div className="flex justify-between">
            <div className="text-left">
              <span
                className={`text-s sm:text-sm md:text-lm font-bold ${isChanged[7] ? 'text-pink-500' : ''}`}
              >
                {plan[7]}
              </span>
              <div
                className={`lg:text-sm text-xs text-gray-500 ${isChanged[8] ? 'text-pink-500' : ''}`}
              >
                {plan[8]}
              </div>
            </div>
          </div>
        </div>

        {/* 문자메시지 */}
        <div className="border-b border-gray-100 p-4 min-h-28 max-h-28">
          <div className="text-sm text-gray-600 mb-2 lg:text-lm">문자메시지</div>
          <div className="flex justify-between">
            <span
              className={`text-s sm:text-sm md:text-lm font-bold ${isChanged[9] ? 'text-pink-500' : ''}`}
            >
              {plan[9]}
            </span>
          </div>
        </div>

        {/* 프리미엄 혜택 */}
        <div className="border-b border-gray-100 p-4 min-h-28 max-h-28">
          <div className="text-sm text-gray-600 mb-2 lg:text-lm">프리미엄 혜택</div>
          <div className="">
            <span
              className={`text-s sm:text-sm md:text-lm font-bold ${isChanged[10] ? 'text-pink-500' : ''}`}
            >
              총 {plan[10]}개
            </span>
          </div>
        </div>

        {/* 미디어 혜택 */}
        <div className="border-b border-gray-100 p-4 min-h-28 max-h-28">
          <div className="text-sm text-gray-600 mb-2 lg:text-lm">미디어 혜택</div>
          <div className="">
            <span
              className={`text-s sm:text-sm md:text-lm font-bold ${isChanged[11] ? 'text-pink-500' : ''}`}
            >
              총 {plan[11]}개
            </span>
          </div>
        </div>

        {/* 기본혜택 */}
        <div className="p-4 border-gray-100 min-h-28 max-h-28">
          <div className="text-sm text-gray-600 mb-2 lg:text-lm">기본혜택</div>
          <div className="flex justify-between">
            <span
              className={`text-s sm:text-sm md:text-lm ${isChanged[12] ? 'text-pink-500' : ''}`}
            >
              {plan[12]}
            </span>
          </div>
        </div>
      </div>

      {/* 요금제 상세보기 링크 */}
      <div className="p-4 mt-4 mb-6 bg-pink-50 rounded-xl">
        <Link
          className="text-pink-500 text-sm lg:text-m underline"
          to={`/plans/${planDetail?.PLAN_ID}`}
        >
          요금제 상세보기
        </Link>
      </div>
    </div>
  );
};

export default PlanCompare;
