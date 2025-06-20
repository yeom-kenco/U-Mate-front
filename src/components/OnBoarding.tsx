import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Button from './Button';

import firstBear from '../assets/onBoarding_1_bear.svg';
import firstPhone from '../assets/onBoarding_1_phone.svg';
import firstSlide from '../assets/onBoarding_1_slide.svg';
import secondBear from '../assets/onBoarding_2_bear.svg';
import secondPhone from '../assets/onBoarding_2_phone.svg';
import secondRate from '../assets/onBoarding_2_rate.svg';
import thirdBear from '../assets/onBoarding_3_bear.svg';
import thirdPhone from '../assets/onBoarding_3_phone.svg';
import thirdReview from '../assets/onBoarding_3_review.svg';
import fourthBear from '../assets/onBoarding_4_bear.svg';
import fourthPhone from '../assets/onBoarding_4_phone.svg';

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
    bearPosition: 'bottom-[85px] right-0',
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
    bearPosition: 'bottom-[-40px] right-[-40px]',
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
    bearPosition: 'bottom-[145px] left-0',
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
    bearPosition: 'bottom-[-20px] left-0',
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
    <div className="relative w-[90%] max-w-md h-screen mx-auto flex flex-col items-center">
      {/* 페이지네이션을 위로 */}
      <div className="custom-pagination flex justify-center mt-14" />

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
            <div className="flex flex-col items-center justify-center px-6 text-center max-w-[412px] mx-auto">
              <h2 className="text-lg font-bold mt-8 max-[400px]:text-lm">{slide.title}</h2>
              <div className="relative w-full max-w-96 mt-8 mx-auto ">
                {/* 온보딩1 안내 슬라이드 에셋 */}
                {slide.slideImg && (
                  <img
                    src={slide.slideImg}
                    alt="안내슬라이드"
                    className="absolute bottom-[-20px] w-full object-contain z-30"
                  />
                )}
                {/* 온보딩 2 요금제 신청 에셋 */}
                {slide.rateImg && (
                  <img
                    src={slide.rateImg}
                    alt="요금제신청"
                    className="absolute bottom-[-20px] w-full object-contain z-10"
                  />
                )}
                {/* 온보딩 3 리뷰 에셋 */}
                {slide.reviewImg && (
                  <img
                    src={slide.reviewImg}
                    alt="요금제신청"
                    className="absolute bottom-[-20px] w-full object-contain z-10"
                  />
                )}

                {/* 중간: 곰돌이 */}
                <img
                  src={slide.bearImg}
                  alt="곰돌이"
                  className={`absolute w-18 h-18 object-contain z-20 ${slide.bearPosition}`}
                />

                {/* 맨 아래: 휴대폰 */}
                <img
                  src={slide.phoneImg}
                  alt="휴대폰"
                  className="w-96 h-auto mx-auto relative z-0"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 버튼 */}
      <div className="py-4 w-full max-w-96">
        <Button onClick={handleNextClick} variant="fill" color="pink" size="xl" className="w-full">
          {currentIndex === 3 ? '시작하기' : '다음'}
        </Button>
        {currentIndex === 0 ? (
          <div
            onClick={handleSkip}
            className="text-zinc-400 underline text-center my-4 cursor-pointer"
          >
            건너뛰기
          </div>
        ) : (
          <div className="mt-14"></div>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
