import { MdCall } from 'react-icons/md';
import React from 'react';

type ButtonProps = {
  variant?: 'fill' | 'outline' | 'ghost' | 'special';
  color?: 'pink' | 'gray' | 'violet' | 'black' | 'white';
  size?: 's' | 'm' | 'lg' | 'xl';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
};

const Button = ({
  variant = 'fill',
  color = 'pink',
  size = 'm',
  onClick,
  children,
  className = '',
  disabled = false,
  fullWidth = false,
  type = 'submit',
}: ButtonProps) => {
  // 스타일 정의
  const variantMap = {
    fill: {
      pink: 'bg-pink-500 text-white hover:bg-pink-400 active:bg-pink-600',
      gray: 'bg-zinc-100 text-zinc-400 hover:bg-zinc-300 active:bg-gray-400',
      violet: 'bg-violet-100 text-black hover:bg-violet-50',
    },
    outline: {
      pink: 'border border-pink-500 text-pink-500 hover:bg-pink-50 focus:bg-pink-100',
      gray: 'border border-zinc-200 text-black hover:bg-zinc-100 focus:bg-zinc-200',
      violet: 'border border-violet-200 text-violet-400 hover:bg-violet-50',
      white: 'border border-white text-white font-normal',
    },
    ghost: {
      pink: 'text-pink-500 hover:bg-pink-50',
      gray: 'text-zinc-400 hover:bg-gray-100',
      violet: 'text-violet-700 hover:bg-violet-50',
      black: 'text-black',
    },
  };

  const specialStyle = 'bg-diagonal text-violet-700 shadow-md';

  // 사이즈별 스타일
  const sizeMap = {
    s: 'text-xs px-3 h-8 min-w-14 max-[400px]:text-[0.625rem] max-[400px]:px-2 max-[400px]:h-7',
    m: 'text-sm px-4 h-9 min-w-16 max-[400px]:text-xs max-[400px]:px-3 max-[400px]:h-8',
    lg: 'text-m px-5 h-11 min-w-16 max-[400px]:text-sm max-[400px]:px-4 max-[400px]:h-10',
    xl: 'text-m px-6 h-14 min-w-24 max-[400px]:text-sm max-[400px]:px-5 max-[400px]:h-12',
  };

  // 둥근 모서리 설정
  const borderRadius = size === 's' || variant === 'special' ? 'rounded-3xl' : 'rounded-lg';

  // 비활성화 상태 스타일
  const disabledStyle = 'bg-zinc-200 text-white cursor-not-allowed pointer-events-none';

  // 최종 스타일 조합
  const variantStyle = variant === 'special' ? specialStyle : variantMap[variant]?.[color] || '';

  const composedClassName = [
    'inline-flex items-center justify-center font-medium transition',
    borderRadius,
    sizeMap[size],
    variantStyle,
    disabled ? disabledStyle : '',
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button onClick={onClick} type={type} className={composedClassName} disabled={disabled}>
      {variant === 'special' && <MdCall className="mr-2 w-5 h-5" />}
      <span className="mt-[2px]">{children}</span>
    </button>
  );
};

export default Button;
