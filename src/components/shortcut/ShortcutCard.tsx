// components/ShortcutCard.tsx
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface ShortcutCardProps {
  icon: React.ReactNode; // 3D 아이콘 (예: <img />, <svg />, etc.)
  title: string;
  description: string;
  onClick?: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-purple-100 relative rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer w-[317px] h-[370px]"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm  mb-4 max-w-[15rem] break-words">{description}</p>

      {/* 바로가기 버튼: 우측 하단 */}
      <div className="absolute bottom-4 right-4 text-sm text-black flex items-center gap-1">
        바로가기 <FiChevronRight size={20} className="text-gray-900 mb-1" />
      </div>
    </div>
  );
};

export default ShortcutCard;
