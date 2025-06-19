import React from 'react';

interface EventBannerCardProps {
  imageSrc: string;
  alt?: string;
  onClick?: () => void;
}

const EventBannerCard = ({ imageSrc, alt = '이벤트 배너', onClick }: EventBannerCardProps) => {
  return (
    <div
      className="w-full max-w-[317px] h-[257px] rounded-[20px] overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img src={imageSrc} alt={alt} className="w-full h-auto object-cover" />
    </div>
  );
};

export default EventBannerCard;
