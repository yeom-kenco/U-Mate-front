import { HiVolumeUp } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type React from 'react';

type ChatBubbleProps = {
  from: 'user' | 'bot';
  message?: string;
  time: string;
  variant?: 'default' | 'first';
  children?: React.ReactNode;
};

const ChatBubble = ({ from, message, time, variant = 'default', children }: ChatBubbleProps) => {
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

  return (
    <div className={containerClasses}>
      {!isUser && <p className="text-sm text-black mb-1">유식이</p>}

      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
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

      {!isFirst && (
        <div className="flex items-center mt-1 gap-2">
          {time && (
            <p className={`text-sm text-zinc-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {time}
            </p>
          )}
          {!isUser && <HiVolumeUp className="text-violet-400 w-3 h-3 mt-[-1px]" />}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
