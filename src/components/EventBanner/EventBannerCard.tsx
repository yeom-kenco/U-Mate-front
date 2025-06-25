import React from 'react';

interface EventBannerCardProps {
  imageSrc: string;
  alt?: string;
  onClick?: () => void;
}

const EventBannerCard = ({ imageSrc, alt = '이벤트 배너', onClick }: EventBannerCardProps) => {
  return (
    <div
      className="w-full 
             max-w-[317px] h-[257px] 
             max-[400px]:max-w-[280px] max-[400px]:h-[220px] 
             max-[360px]:max-w-[270px] max-[360px]:h-[210px] 
             md:max-w-[450px] md:h-[350px] 
             rounded-[20px] overflow-hidden"
      onClick={onClick}
    >
      <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default EventBannerCard;
