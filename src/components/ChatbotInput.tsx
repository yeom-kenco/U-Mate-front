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
    // 파일 업로드 로직 등 추가
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    console.log('Mic button clicked', !isRecording ? 'Recording started' : 'Recording stopped');
    // 음성 녹음 로직 등 추가
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-full border border-gray-200 focus-within:border-blue-400 transition-colors">
      {/* Plus 아이콘 */}
      <button
        type="button"
        onClick={handlePlusClick}
        disabled={disabled}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
      >
        <FiPlusSquare size={20} />
      </button>

      {/* 텍스트 입력창 */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm"
      />

      {/* 마이크 아이콘 */}
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
  );
}
