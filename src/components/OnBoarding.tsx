import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/pagination';

import Button from './Button';

import firstBear from '../assets/onBoarding_1_bear.svg';
import firstPhone from '../assets/onBoarding_1_phone.webp';
import firstSlide from '../assets/onBoarding_1_slide.svg';
import secondBear from '../assets/onBoarding_2_bear.svg';
import secondPhone from '../assets/onBoarding_2_phone.webp';
import secondRate from '../assets/onBoarding_2_rate.svg';
import thirdBear from '../assets/onBoarding_3_bear.svg';
import thirdPhone from '../assets/onBoarding_3_phone.webp';
import thirdReview from '../assets/onBoarding_3_review.svg';
import fourthBear from '../assets/onBoarding_4_bear.svg';
import fourthPhone from '../assets/onBoarding_4_phone.webp';

type OnboardingSlide = {
  title: JSX.Element;
  phoneImg: string;
  bearImg: string;
  slideImg?: string;
  rateImg?: string;
  reviewImg?: string;
  bearPosition?: string;
};

const onboardingSlides: OnboardingSlide[] = [
  {
    title: (
      <>
        처음이신가요?
        <br /> 버튼 한번이면, 주요 기능을{' '}
        <span className="text-pink-500 font-semibold">
          <br />
          누구나 쉽게
        </span>{' '}
        사용 가능해요!
      </>
    ),
    phoneImg: firstPhone,
    bearImg: firstBear,
    slideImg: firstSlide,
    bearPosition: 'bottom-[34vw] right-[6vw] min-[420px]:bottom-[142px] min-[420px]:right-8',
  },
  {
    title: (
      <>
        비슷한 요금제, 뭐가 다를까요?
        <br />
        <span className="text-pink-500 font-semibold">차이점</span>만 쏙 골라
        <br /> 쉽게 비교해드릴게요!
      </>
    ),
    phoneImg: secondPhone,
    rateImg: secondRate,
    bearImg: secondBear,
    bearPosition: 'bottom-[-15px] right-[-3px] max-[420px]:right-[-12px]',
  },
  {
    title: (
      <>
        다른 사용자들의
        <br /> <span className="text-pink-500 font-semibold">요금제 후기</span>와{' '}
        <span className="text-pink-500 font-semibold">별점</span>을 확인하고,
        <br />
        나만의 후기도 쉽게 남겨보세요.
      </>
    ),
    phoneImg: thirdPhone,
    bearImg: thirdBear,
    reviewImg: thirdReview,
    bearPosition: clsx(
      'left-[7vw] bottom-[39vw]',
      'max-[400px]:bottom-[41vw]',
      'min-[420px]:left-11 min-[420px]:bottom-[166px]'
    ),
  },
  {
    title: (
      <>
        궁금한 점이 있으시다면
        <br /> <span className="text-pink-500 font-semibold">챗봇</span>에게 물어보세요.
        <br />
        사용자 맞춤형 답변을 드려요!
      </>
    ),
    phoneImg: fourthPhone,
    bearImg: fourthBear,
    bearPosition: 'bottom-[2vw] min-[420px]:bottom-0 left-10 max-[420px]:left-[8vw]',
  },
];

const OnBoarding = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      if (swiper.activeIndex === swiper.slides.length - 1) {
        // 마지막 슬라이드 → 페이지 이동
        navigate('/');
      } else {
        swiper.slideNext();
      }
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* 모바일 사이즈 고정된 내부 컨테이너 */}
      <div className="w-full max-w-[420px] h-full px-4 flex flex-col justify-center items-center bg-white">
        <div className="flex flex-col items-center justify-center w-full">
          {/* 페이지네이션을 위로 */}
          <div className="custom-pagination flex justify-center mt-8" />

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.realIndex);
            }}
            pagination={{
              el: '.custom-pagination',
              clickable: true,
            }}
            modules={[Pagination]}
            className="w-full flex-1"
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={50}
          >
            {onboardingSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center text-center max-w-[420px] mx-auto mb-4">
                  <h2 className="text-lm font-bold mt-6 max-[420px]:text-m">{slide.title}</h2>
                  <div className="relative w-full h-auto max-w-96 my-6 pb-5 mx-auto">
                    {/* 온보딩1 안내 슬라이드 에셋 */}
                    {slide.slideImg && (
                      <img
                        src={slide.slideImg}
                        alt="안내슬라이드"
                        className={clsx(
                          'absolute object-contain z-30',
                          'bottom-[-5px]',
                          'w-[90vw]',
                          'max-w-360px',
                          'left-1/2 -translate-x-1/2',
                          'min-[420px]:w-[360px]'
                        )}
                      />
                    )}
                    {/* 온보딩 2 요금제 신청 에셋 */}
                    {slide.rateImg && (
                      <img
                        src={slide.rateImg}
                        alt="요금제신청"
                        className={clsx(
                          'absolute object-contain z-10',
                          'bottom-[-3vw]',
                          'w-[80vw]',
                          'max-w-[320px]',
                          'left-1/2 -translate-x-1/2',
                          'min-[420px]:w-[280px]',
                          'min-[420px]:bottom-[-12px]'
                        )}
                      />
                    )}
                    {/* 온보딩 3 리뷰 에셋 */}
                    {slide.reviewImg && (
                      <img
                        src={slide.reviewImg}
                        alt="리뷰"
                        className={clsx(
                          'absolute object-contain z-10',
                          'bottom-[-12px]',
                          'w-[90vw]',
                          'max-w-[350px]',
                          'left-1/2 -translate-x-1/2',
                          'min-[420px]:w-[350px]'
                        )}
                      />
                    )}

                    {/* 중간: 곰돌이 */}
                    <img
                      src={slide.bearImg}
                      alt="곰돌이"
                      className={`absolute w-[30vw] h-[30vw] object-contain z-20 max-w-28 max-h-28 ${slide.bearPosition}`}
                    />

                    {/* 맨 아래: 휴대폰 */}
                    <img
                      src={slide.phoneImg}
                      alt="휴대폰"
                      className={clsx(
                        'mx-auto mb-3 relative z-0 object-contain',
                        'h-auto',
                        'w-[60vw] max-w-[320px]',
                        'max-h-[calc(100vh-340px)]',
                        'min-[420px]:w-[320px] min-[420px]:h-[350px]'
                      )}
                    />
                  </div>
                </div>
                {/* 버튼 */}
                <div className="w-full max-w-96 flex flex-col">
                  <Button
                    onClick={handleNextClick}
                    variant="fill"
                    color="pink"
                    size="lg"
                    fullWidth
                    className=""
                  >
                    {currentIndex === 3 ? '시작하기' : '다음'}
                  </Button>

                  <div className="h-[44px] mt-2 flex justify-center items-center">
                    {currentIndex === 0 ? (
                      <Button
                        size="m"
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-zinc-400 underline text-center cursor-pointer font-normal hover:bg-transparent"
                      >
                        건너뛰기
                      </Button>
                    ) : null}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
