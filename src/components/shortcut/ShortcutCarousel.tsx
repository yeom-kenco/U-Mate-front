import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useState } from 'react';
import ShortcutCard from './ShortcutCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const cards = [
  {
    icon: <img src="/images/shortcut/shortcut-main.png" alt="대표 페이지" className="w-30 h-30" />,
    title: '대표 페이지',
    description: '다양한 이벤트부터 요금제, 혜택, 비교까지 필요한 정보를 한 번에 확인하세요.',
    onClick: () => console.log('대표 페이지로 이동'),
  },
  {
    icon: (
      <img
        src="/images/shortcut/shortcut-looking.png"
        alt="요금제 살펴보기"
        className="w-30 h-30"
      />
    ),
    title: '요금제 살펴보기',
    description: '내게 꼭 맞는 요금제, 지금 바로 살펴보세요',
    onClick: () => console.log('요금제 페이지로 이동'),
  },
  {
    icon: (
      <img
        src="/images/shortcut/shortcut-chatbot.png"
        alt="상담봇과 대화하기"
        className="w-30 h-30"
      />
    ),
    title: '상담봇과 대화하기',
    description: '요금제부터 혜택까지 궁금한 내용을 친절히 안내해 드려요.',
    onClick: () => console.log('챗봇 페이지로 이동'),
  },
  {
    icon: <img src="/images/shortcut/shortcut-main.png" alt="대표 페이지" className="w-30 h-30" />,
    title: '대표 페이지',
    description: '다양한 이벤트부터 요금제, 혜택, 비교까지 필요한 정보를 한 번에 확인하세요.',
    onClick: () => console.log('대표 페이지로 이동'),
  },
  {
    icon: (
      <img
        src="/images/shortcut/shortcut-looking.png"
        alt="요금제 살펴보기"
        className="w-30 h-30"
      />
    ),
    title: '요금제 살펴보기',
    description: '내게 꼭 맞는 요금제, 지금 바로 살펴보세요',
    onClick: () => console.log('요금제 페이지로 이동'),
  },
  {
    icon: (
      <img
        src="/images/shortcut/shortcut-chatbot.png"
        alt="상담봇과 대화하기"
        className="w-30 h-30"
      />
    ),
    title: '상담봇과 대화하기',
    description: '요금제부터 혜택까지 궁금한 내용을 친절히 안내해 드려요.',
    onClick: () => console.log('챗봇 페이지로 이동'),
  },
];

const ShortcutCarousel = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const initialSlideIndex = Math.floor(cards.length / 2);
  const [activeIndex, setActiveIndex] = useState(initialSlideIndex);

  return (
    <div className="w-screen flex justify-center items-center relative py-8 overflow-x-clip">
      {/* 화살표 */}
      <button
        ref={prevRef}
        className="absolute left-5 z-50 bg-white rounded-full w-12 h-12 shadow-md flex items-center justify-center "
      >
        <FiChevronLeft size={35} className="text-purple-500" strokeWidth={1.5} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-5 z-50 bg-white rounded-full w-12 h-12 shadow-md flex items-center justify-center "
      >
        <FiChevronRight size={35} className="text-purple-500" strokeWidth={1.5} />
      </button>
      {/* Swiper를 중앙 고정 너비로 감싸는 컨테이너 */}
      <div className="relative w-[951px] flex justify-center items-center overflow-visible">
        {/* 캐러셀 */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          centeredSlides
          loop
          spaceBetween={15}
          initialSlide={initialSlideIndex}
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation === 'boolean' ||
              swiper.params.navigation === undefined
            ) {
              swiper.params.navigation = {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };
            } else {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full overflow-visible"
        >
          {cards.map((card, idx) => {
            const total = cards.length;
            const isActive = idx === activeIndex;
            const isLeft = idx === (activeIndex - 1 + total) % total;
            const isRight = idx === (activeIndex + 1) % total;

            const zIndex = isActive ? 30 : isLeft ? 20 : isRight ? 10 : 0;
            const scale = isActive ? 'scale-100' : isLeft || isRight ? 'scale-100' : 'scale-90';
            const translateY = isActive ? 'translate-y-2' : 'translate-y-0';
            const opacity = isActive || isLeft || isRight ? 'opacity-100' : 'opacity-0';

            return (
              <SwiperSlide key={idx} className="!overflow-visible flex justify-center">
                <div
                  className={`rounded-3xl transition-all duration-500 ease-in-out transform ${scale} ${translateY} ${opacity}`}
                  style={{
                    width: '317px',
                    height: '380px',
                    zIndex,
                  }}
                >
                  {isActive ? (
                    <ShortcutCard {...card} />
                  ) : isLeft || isRight ? (
                    <div className="w-full h-full bg-purple-400 rounded-3xl shadow-md" />
                  ) : null}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ShortcutCarousel;
