import { HiVolumeUp, HiStop } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';

type ChatBubbleProps = {
  from: 'user' | 'bot';
  message?: string;
  time: string;
  variant?: 'default' | 'first';
  children?: React.ReactNode;
};

export default function ChatBubble({
  from,
  message,
  time,
  variant = 'default',
  children,
}: ChatBubbleProps) {
  const isUser = from === 'user';
  const isFirst = variant === 'first';

  const containerClasses = [
    'flex flex-col',
    isUser ? 'items-end' : 'items-start',
    isFirst ? 'mb-4' : 'my-8',
  ]
    .filter(Boolean)
    .join(' ');

  const bubbleWidthClass = isFirst ? 'w-full max-w-sm' : 'w-fit max-w-64';

  const [isSpeaking, setIsSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleSpeech = useCallback(() => {
    if (!message) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(message);
    utter.lang = 'ko-KR';
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    utterRef.current = utter;
    speechSynthesis.speak(utter);
    setIsSpeaking(true);
  }, [message, isSpeaking]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, []);

  return (
    <div className={containerClasses}>
      {/* 유식이 아바타 */}
      {!isUser && (
        <div className="flex items-center gap-2 mb-1">
          <div className="w-[45px] h-[45px] rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <img
              src="/images/chatbot/chatbot-avatar.png"
              alt="유식이 아바타"
              className="w-[35px] h-[35px] object-contain"
            />
          </div>
          <p className="text-sm text-black font-medium">유식이</p>
        </div>
      )}

      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
        <div className={!isUser ? 'ml-[53px]' : undefined}>
          <div
            className={
              `${bubbleWidthClass} rounded-3xl ${isFirst ? '' : 'py-3 px-4'} ` +
              (isUser
                ? 'bg-violet-100 rounded-br-none drop-shadow-[0_4px_15px_rgba(51,5,156,0.25)]'
                : isFirst
                  ? ''
                  : 'bg-white rounded-tl-none drop-shadow-[0_0px_15px_rgba(51,5,156,0.15)]')
            }
          >
            {isFirst && children ? (
              children
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-sm text-black" {...props} />,
                }}
              >
                {message || ''}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>

      {!isFirst && (
        <div className={`flex items-center mt-1 gap-2 ${!isUser ? 'ml-[53px]' : ''}`}>
          {time && <p className="text-sm text-zinc-400">{time}</p>}
          {!isUser && (
            <button onClick={toggleSpeech} aria-label="음성 재생 또는 정지">
              {isSpeaking ? (
                <HiStop className="text-red-500 w-4 h-4 hover:text-red-700" />
              ) : (
                <HiVolumeUp className="text-violet-400 w-4 h-4 hover:text-violet-600" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
