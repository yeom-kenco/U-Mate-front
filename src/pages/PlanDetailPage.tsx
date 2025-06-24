import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanTopBanner from '../components/PlanDetail/PlanTopBanner';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

const PlanDetailPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
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
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      const res = await fetch(`https://seungwoo.i234.me:3333/planDetail/${id}`);
      const json = await res.json();
      if (json.success) {
        setPlan(json.data.plan);
        setReviews(json.data.reviews);
      }
    };

    fetchPlanDetail();
  }, [id]);

  if (!plan) return <div>로딩 중...</div>;

  const averageRating =
    plan.REVIEW_USER_COUNT > 0 ? parseFloat(plan.RECEIVED_STAR_COUNT) / plan.REVIEW_USER_COUNT : 0;

  const discounted = calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME);

  return (
    <div className="overflow-x-hidden">
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

      {reviews.length > 0 && (
        <section className="mt-10 ml-[5%] md:mx-52">
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

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth h-[210px] ml-[-2%] pl-[2%] cursor-grab"
          >
            <div className="flex gap-4 flex-nowrap pr-4 min-w-max">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.REVIEW_ID}
                  writerName={review.USER_NAME}
                  writerAge={`${review.USER_BIRTHDAY}대`}
                  content={review.REVIEW_CONTENT}
                  date={review.CREATED_AT.slice(2, 10).replace(/-/g, '.')}
                  rating={parseFloat(review.STAR_RATING)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PlanDetailPage;
