import { useState, type KeyboardEvent } from 'react';
import { FiPlusSquare, FiMic } from 'react-icons/fi';

interface ChatbotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatbotInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = '텍스트를 입력해주세요',
}: ChatbotInputProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handlePlusClick = () => {
    console.log('Plus button clicked');
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    console.log('Mic button clicked', !isRecording ? 'Recording started' : 'Recording stopped');
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* + 버튼 (왼쪽 독립 배치) */}
      <button
        type="button"
        onClick={handlePlusClick}
        disabled={disabled}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
      >
        <FiPlusSquare size={20} />
      </button>

      {/* 입력창 + 마이크 (오른쪽) */}
      <div className="flex flex-1 items-center gap-2 px-4 py-3 bg-gray-100 rounded-full border border-gray-200 focus-within:border-blue-400 transition-colors">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm"
        />

        <button
          type="button"
          onClick={handleMicClick}
          disabled={disabled}
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            isRecording
              ? 'text-red-500 bg-red-50 hover:bg-red-100'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FiMic size={20} />
        </button>
      </div>
    </div>
  );
}
