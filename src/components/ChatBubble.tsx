import { AiFillSound } from 'react-icons/ai';

type ChatBubbleProps = {
  from: 'user' | 'bot';
  message: string;
  time: string;
  children?: React.ReactNode; // 카드나 버튼 등 확장 콘텐츠
};

const ChatBubble = ({ from, message, time, children }: ChatBubbleProps) => {
  const isUser = from === 'user';

  return (
    <div className={`h-fit flex flex-col ${isUser ? 'items-end' : 'items-start'} my-8`}>
      {!isUser && <p className="text-sm text-black mb-1">유식이</p>}
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`
            w-fit max-w-[50%] break-words rounded-3xl py-3 px-4
            ${isUser ? 'bg-violet-100 rounded-br-none drop-shadow-[0_4px_15px_rgba(51,5,156,0.25)]' : 'bg-white rounded-tl-none drop-shadow-[0_0px_15px_rgba(51,5,156,0.15)]'}
          `}
        >
          {message && <p className="text-sm text-black">{message}</p>}
          {children}
        </div>
      </div>
      <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {time && <p className="text-s text-zinc-400">{time}</p>}
        {!isUser && <AiFillSound className="text-violet-400 w-4 h-4 mt-[-1px]" />}
      </div>
    </div>
  );
};

export default ChatBubble;

{
  /* 사용 예시

import { getCurrentTime } from '../utils/getCurrentTime';

  const now = getCurrentTime(); // 현재 시간 계산 함수 호출
    <ChatBubble message="안녕하세요" from="user" time={now} />
    <ChatBubble message="넹 저는 유식이입니다" from="bot" />
    <ChatBubble from="bot" time="16:00">
      <img src="/public/vite.svg" alt="logo" className="my-4 w-32 h-auto" /> 유식이 기본 멘트에서는 이런 형태로 사용
      <h4>아래와 같이 질문해보세요!</h4>
    </ChatBubble> 
*/
}
