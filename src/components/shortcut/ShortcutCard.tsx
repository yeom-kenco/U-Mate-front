// components/ShortcutCard.tsx
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface ShortcutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;

  // 바로가기 버튼 보이기 여부
  showButton?: boolean;
  // 카드 크기 조절
  width?: string;
  height?: string;
  // 아이콘 크기 조절
  iconSize?: string;
  // 타이틀과 설명 커스터마이징
  titleClassName?: string;
  descriptionClassName?: string;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({
  icon,
  title,
  description,
  onClick,
  showButton = true,
  width = 'w-[310px]',
  height = 'h-[380px]',
  iconSize = 'w-30 h-30',
  titleClassName = '',
  descriptionClassName = 'text-sm',
}) => {
  const containerClasses = [
    'bg-purple-100',
    'relative rounded-3xl shadow-lg p-6',
    'flex flex-col items-center text-center',
    'transition transform duration-150 active:scale-95 hover:shadow-lg cursor-pointer',
    width,
    height,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* 아이콘 영역 */}
      <div className={`mb-4 ${iconSize}`}>{icon}</div>

      {/* 타이틀 (커스터 클래스 추가 가능) */}
      <h3 className={`text-lg font-bold mb-1 ${titleClassName}`}>{title}</h3>

      {/* 설명 (커스터 클래스 우선 적용) */}
      <p className={`${descriptionClassName} mb-4 max-w-[19rem] break-words whitespace-pre-line`}>
        {description}
      </p>

      {/* 바로가기 버튼 */}
      {showButton && (
        <div className="absolute bottom-4 right-4 text-sm text-black flex items-center gap-1">
          바로가기 <FiChevronRight size={20} className="text-gray-900 mb-1" />
        </div>
      )}
    </div>
  );
};

export default ShortcutCard;
