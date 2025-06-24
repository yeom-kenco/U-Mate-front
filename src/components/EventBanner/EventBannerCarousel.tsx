// EventBannerCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './../../index.css';
import EventBannerCard from './EventBannerCard';

const images = [
  '/images/eventBanner/event-1.png',
  '/images/eventBanner/event-2.png',
  '/images/eventBanner/event-3.png',
  '/images/eventBanner/event-4.png',
];

const EventBannerCarousel = () => {
  return (
    <div className="relative w-full flex justify-center md:mt-20">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={-2}
        slidesPerView={'auto'}
        centeredSlides
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full pb-10"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="!w-[80%] sm:!w-[400px] md:!w-[520px] flex justify-center">
            <EventBannerCard imageSrc={src} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 페이지네이션 수동 배치 */}
      <div className="custom-pagination absolute left-1/2 -translate-x-1/2 mt-4 bottom-[-24px] flex gap-2" />
    </div>
  );
};

export default EventBannerCarousel;
