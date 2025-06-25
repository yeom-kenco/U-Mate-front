import React from 'react';

interface DropdownSelectorProps {
  label: string;
  onClick: () => void;
  plan: string;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ label, onClick, plan }) => {
  return (
    <div className="relative w-full" onClick={onClick}>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[110px] max-h-[110px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-s md:text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-m md:text-lm font-semibold text-gray-900">{plan}</p>
          </div>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownSelector;
