import clsx from 'clsx';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Button from './Button';
interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; //ex : 이메일 비밀번호
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  suffixButton?: React.ReactNode; // ex: 중복 확인 버튼
  variant?: 'line' | 'box'; // input박스 유형
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '텍스트를 입력해주세요',
  required,
  disabled,
  error,
  suffixButton,
  variant = 'line',
}) => {
  const wrapperClass =
    variant === 'line' ? 'flex flex-col gap-[6px] w-full' : 'flex flex-col gap-2 w-full';
  const inputWrapperClass =
    variant === 'line'
      ? 'border-b  px-2 py-2 bg-transparent'
      : 'border  rounded-lg px-2 py-2 bg-white';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapperClass}>
      {/*레이블 require시 *표시 */}
      {label && (
        <label
          className={clsx(
            'text-s mb-[-5px]',
            variant === 'line' ? 'text-gray-400' : 'text-gray-600 font-medium'
          )}
        >
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      {/*wrapper 영역 focus시 색 변경 */}
      <div
        className={clsx(
          'flex mb-4 items-center border-zinc-200 transition duration-200 focus-within:border-black',
          inputWrapperClass
        )}
      >
        {/*input 영역*/}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'flex-1 text-sm mt-1 outline-none placeholder:font-normal placeholder-[#A9B3C2]',
            'flex-1 text-m outline-none  placeholder-[#A9B3C2]',
            variant === 'line' ? 'bg-transparent' : 'bg-white'
          )}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-zinc-200"
          >
            {!showPassword ? (
              <IoEyeOffOutline className="size-6" />
            ) : (
              <IoEyeOutline className="size-6" />
            )}
          </button>
        )}
        {suffixButton && (
          <Button
            variant="outline"
            size="m"
            color="gray"
            className="border-zinc-400 ml-2 bg-zinc-50"
          >
            {suffixButton}
          </Button>
        )}
      </div>
      {/*error영역*/}
      {error && <p className="text-xs text-pink-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
