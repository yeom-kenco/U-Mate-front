// components/ShortcutCard.tsx
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface ShortcutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  showButton?: boolean;
  width?: string;
  height?: string;
  iconSize?: string;
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
      <div className={`mb-4 ${iconSize}`}>{icon}</div>
      <h3 className={`text-lg font-bold mb-1 ${titleClassName}`}>{title}</h3>
      <p className={`${descriptionClassName} mb-4 max-w-[19rem] break-words whitespace-pre-line`}>
        {description}
      </p>
      {showButton && (
        <div className="absolute bottom-4 right-4 text-sm text-black flex items-center gap-1">
          바로가기 <FiChevronRight size={20} className="text-gray-900 mb-1" />
        </div>
      )}
    </div>
  );
};

export default ShortcutCard;
