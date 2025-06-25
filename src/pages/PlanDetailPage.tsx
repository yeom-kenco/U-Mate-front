import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanTopBanner from '../components/PlanDetail/PlanTopBanner';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import ReviewModal from '../components/Modal/Review/ReviewModal';
import { benefitList } from '../data/benefits';
import BenefitDropBar from '../components/BenefitDropBar';
import PlanBottomSheet from '../components/BottomSheet/PlanBottomSheet';
import PlanBottomBar from '../components/PlanDetail/PlanBottomBar';
import { Loading } from '../components/Loading';

// 상단 import 아래에 위치시키기
const benefitIdToIndexMap: Record<number, number> = {
  15: 0,
  16: 1,
  17: 2,
  18: 3,
  19: 4,
  20: 5,
  21: 5,
  22: 6,
  23: 7,
  24: 8,
  25: 9,
};

interface Benefit {
  BENEFIT_ID: number;
  NAME: string;
  TYPE: string;
}
interface Plan {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  CALL_INFO: string;
  CALL_INFO_DETAIL?: string;
  SMS_INFO: string;
  DATA_INFO: string;
  DATA_INFO_DETAIL?: string;
  SHARE_DATA: string;
  AGE_GROUP: string;
  USER_COUNT: number;
  RECEIVED_STAR_COUNT: string;
  REVIEW_USER_COUNT: number;
  benefits: Benefit[];
}

const PlanDetailPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [bottomOpen, setBottomOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const scrollRef = useHorizontalScroll();

  useEffect(() => {
    setHeaderConfig({
      title: '요금제 상세',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, [setHeaderConfig]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;

      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const onMouseDown = (e: MouseEvent) => {
        isDown = true;
        el.classList.add('cursor-grabbing');
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.0;
        el.scrollLeft = scrollLeft - walk;
      };

      const onMouseUp = () => {
        isDown = false;
        el.classList.remove('cursor-grabbing');
      };

      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseup', onMouseUp);
      el.addEventListener('mouseleave', onMouseUp);

      return () => {
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseup', onMouseUp);
        el.removeEventListener('mouseleave', onMouseUp);
      };
    }, 100); // 💡 100ms 후 DOM 확정된 뒤 붙이기

    return () => clearTimeout(timer);
  }, [reviews]);

  const { id } = useParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [benefits, setBenefits] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      const res = await fetch(`https://seungwoo.i234.me:3333/planDetail/${id}`);
      const json = await res.json();
      if (json.success) {
        setPlan(json.data.plan);
        setReviews(json.data.reviews);
        setBenefits(json.data.benefits);
      }
    };

    fetchPlanDetail();
  }, [id]);

  if (!plan)
    return (
      <div>
        <Loading />
      </div>
    ); // 추후 컴포넌트 넣어주기

  // 혜택 인덱스 매핑 처리
  const discountBenefitIds = [15, 16, 17, 18, 19];
  const basicBenefitIds = [20, 21, 22, 23, 24, 25]; // 20,21은 하나의 컴포넌트로 처리됨

  const discountBenefitIndexes = benefits
    .filter((b) => discountBenefitIds.includes(b.BENEFIT_ID))
    .map((b) => benefitIdToIndexMap[b.BENEFIT_ID])
    .filter((i) => i !== undefined);

  const basicBenefitIndexes = benefits
    .filter((b) => basicBenefitIds.includes(b.BENEFIT_ID))
    .map((b) => benefitIdToIndexMap[b.BENEFIT_ID])
    .filter((v, i, self) => v !== undefined && self.indexOf(v) === i); // 중복 제거

  const averageRating =
    plan.REVIEW_USER_COUNT > 0 ? parseFloat(plan.RECEIVED_STAR_COUNT) / plan.REVIEW_USER_COUNT : 0;

  const discounted = calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME);

  return (
    <div className="overflow-x-hidden bg-background">
      <PlanTopBanner
        planName={plan.PLAN_NAME}
        monthlyFee={plan.MONTHLY_FEE}
        dataInfo={plan.DATA_INFO}
        shareData={plan.SHARE_DATA}
        callInfo={plan.CALL_INFO}
        smsInfo={plan.SMS_INFO}
        starRating={averageRating}
        discountedPrice={discounted}
      />

      <section className="mt-10 ml-[5%] md:mx-52 md:mt-20">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">후기로 보는 요금제 ({reviews.length})</h2>
          <button
            className="text-sm text-zinc-500 flex items-center gap-1 mr-[5%] md:text-m md:mr-0 hover:text-pink-500 active:text-pink-500"
            onClick={() => setIsReviewModalOpen(true)}
          >
            전체
            <HiOutlineMenuAlt2 className="text-lg" />
          </button>
        </div>

        {reviews.length > 0 ? (
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth h-[210px] ml-[-2%] pl-[2%] cursor-grab"
          >
            <div className="flex gap-4 flex-nowrap pr-4 min-w-max">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.REVIEW_ID}
                  reviewId={review.REVIEW_ID}
                  writerName={review.USER_NAME}
                  writerAge={`${review.USER_BIRTHDAY}대`}
                  content={review.REVIEW_CONTENT}
                  date={review.CREATED_AT.slice(2, 10).replace(/-/g, '.')}
                  rating={parseFloat(review.STAR_RATING)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-left text-zinc-400 text-sm mt-6">아직 리뷰가 한 개도 없어요🥲</p>
        )}
      </section>

      {isReviewModalOpen && (
        <ReviewModal
          type="allReviewList"
          reviews={reviews}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}

      <section className="mt-10 px-6 md:px-52 mb-20 md:mt-20 md:mb-32">
        <BenefitDropBar label="할인혜택" indexes={discountBenefitIndexes} data={benefitList} />
        <BenefitDropBar label="기본혜택" indexes={basicBenefitIndexes} data={benefitList} />
      </section>

      <PlanBottomSheet
        isOpen={bottomOpen}
        onClose={() => setBottomOpen(false)}
        onOpen={() => setBottomOpen(true)}
        heightClass="h-[205px] lg:h-[150px]"
      >
        <PlanBottomBar
          planId={plan.PLAN_ID}
          planName={plan.PLAN_NAME}
          price={plan.MONTHLY_FEE}
          discountedPrice={discounted}
        />
      </PlanBottomSheet>
    </div>
  );
};

export default PlanDetailPage;
