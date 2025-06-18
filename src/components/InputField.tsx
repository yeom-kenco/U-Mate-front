import clsx from 'clsx';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; //ex : 이메일 비밀번호
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  suffixButton?: React.ReactNode; // ex: 중복 확인 버튼
  eyeIcon?: React.ReactNode; // ex: 비밀번호 보기 버튼
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
  eyeIcon,
  variant = 'line',
}) => {
  const wrapperClass =
    variant === 'line' ? 'flex flex-col gap-[6px] w-full' : 'flex flex-col gap-2 w-full';
  const inputWrapperClass =
    variant === 'line'
      ? 'border-b  px-2 py-2 bg-transparent'
      : 'border  rounded-lg px-2 py-2 bg-white';
  return (
    <div className={wrapperClass}>
      {/*레이블 require시 *표시 */}
      {label && (
        <label
          className={clsx(
            'text-s ',
            variant === 'line' ? 'text-gray-400' : 'text-gray-600 font-medium'
          )}
        >
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      {/*wrapper 영역 focus시 색 변경 */}
      <div
        className={clsx(
          'flex items-center border-zinc-200 transition duration-200 focus-within:border-black',
          inputWrapperClass
        )}
      >
        {/*input 영역*/}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'flex-1 text-sm outline-none',
            variant === 'line' ? 'bg-transparent' : 'bg-white'
          )}
        />
        {eyeIcon && <div className="ml-2">{eyeIcon}</div>}
        {suffixButton && <div className="ml-2">{suffixButton}</div>}
      </div>
      {/*erroe영역*/}
      {error && <p className="text-xs text-pink-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
