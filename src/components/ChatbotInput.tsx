import { useState, useEffect } from 'react';
import { FiPlusSquare, FiMic, FiSend } from 'react-icons/fi';

interface ChatbotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  onPlusClick?: () => void;
}

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

export default function ChatbotInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = '텍스트를 입력해주세요',
  onPlusClick,
}: ChatbotInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  // ✅ 처음 접속 시 툴팁 보여줄지 결정
  useEffect(() => {
    const seenTooltip = localStorage.getItem('seenPlusTooltip');
    if (!seenTooltip) {
      setShowTooltip(true);
    }
  }, []);

  // ✅ 음성 인식 설정
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('이 브라우저는 SpeechRecognition을 지원하지 않습니다.');
      return;
    }

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recog = new SpeechRecognitionCtor();

    recog.lang = 'ko-KR';
    recog.interimResults = true;
    recog.continuous = false;

    recog.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results[event.results.length - 1];
      const transcript = last[0].transcript.trim();
      onChange(transcript);
      if (last.isFinal) onSend();
    };

    recog.onerror = () => setIsRecording(false);
    recog.onend = () => setIsRecording(false);

    setRecognition(recog);
  }, [onChange, onSend]);

  const handleMicClick = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSendClick = () => {
    if (value.trim()) onSend();
  };

  // ✅ + 버튼 클릭 시 툴팁 안 보이게 처리
  const handlePlusClick = () => {
    if (onPlusClick) onPlusClick();
    localStorage.setItem('seenPlusTooltip', 'true');
    setShowTooltip(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  const showSend = !!value.trim();

  return (
    <div className="flex items-center gap-2 w-full relative">
      <div className="relative">
        <button
          type="button"
          onClick={handlePlusClick}
          disabled={disabled}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiPlusSquare size={20} />
        </button>

        {showTooltip && (
          <div
            className="absolute z-10 bg-indigo-700 text-white text-xs px-3 py-2 rounded-lg max-w-[200px] w-max break-words shadow-md animate-bounce"
            style={{ left: '3px', top: '-3rem' }}
          >
            버튼을 누르면 원하는 질문들을
            <br />
            빠르게 찾아볼 수 있어요!
            <div className="absolute left-2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-[10px] border-t-indigo-700" />
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center gap-2 px-4 py-3 bg-gray-100 rounded-full border border-gray-200 transition-colors">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm"
        />

        {showSend ? (
          <button
            type="button"
            onClick={handleSendClick}
            disabled={disabled}
            aria-label="메시지 전송"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-700"
          >
            <FiSend size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMicClick}
            disabled={disabled}
            aria-label="음성 입력"
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isRecording
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiMic size={20} className={isRecording ? 'animate-pulse' : undefined} />
          </button>
        )}
      </div>
    </div>
  );
}
