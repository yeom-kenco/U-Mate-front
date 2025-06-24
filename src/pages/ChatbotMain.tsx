import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import ChatbotInput from '../components/ChatbotInput';
import FirstMessage from '../components/ChatbotFirstMessage';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SolutionList from '../components/BottomSheet/SolutionList';
import LoginBanner from '../components/LoginBanner';
import Research from '../components/BottomSheet/Research';

type Message = {
  type: 'user' | 'bot';
  content: string;
  time?: string;
};

type GuestEntry = {
  MESSAGE_TYPE: 'user' | 'assistant';
  MESSAGE: string;
  CREATED_AT: string;
};

export default function ChatbotMain() {
  const setHeaderConfig = useOutletContext<(c: HeaderProps) => void>();
  useEffect(() => {
    setHeaderConfig({
      title: 'U:M 상담챗봇',
      showBackButton: true,
      showSearch: true,
    });
  }, [setHeaderConfig]);

  const [email, setEmail] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResearch, setShowResearch] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const guestHistoryRef = useRef<GuestEntry[]>(
    JSON.parse(localStorage.getItem('guestChat') || '[]')
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const pushMsg = (type: Message['type'], content: string, time?: string) => {
    setMessages((m) => [...m, { type, content, time }]);
  };

  const connect = () => {
    if (email && !email.includes('@')) {
      alert('올바른 이메일을 입력해주세요');
      return;
    }

    if (!email && guestHistoryRef.current.length) {
      guestHistoryRef.current.forEach((entry) => {
        const from: Message['type'] = entry.MESSAGE_TYPE === 'assistant' ? 'bot' : 'user';
        pushMsg(from, entry.MESSAGE, formatTime(new Date(entry.CREATED_AT)));
      });
    }

    const query = email ? `email=${encodeURIComponent(email)}&history=true` : 'history=false';
    ws.current = new WebSocket(`wss://seungwoo.i234.me:3333/realtime-chat?${query}`);

    ws.current.onopen = () => console.log('WebSocket 연결됨');
    ws.current.onmessage = (ev) => {
      let data;
      try {
        data = JSON.parse(ev.data);
      } catch {
        return;
      }
      if (data.type === 'text_done') {
        pushMsg('bot', data.text, formatTime(new Date()));
        setIsLoading(false);
        if (!email) {
          const entry: GuestEntry = {
            MESSAGE_TYPE: 'assistant',
            MESSAGE: data.text,
            CREATED_AT: new Date().toISOString(),
          };
          guestHistoryRef.current.push(entry);
          localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
        }
      }
    };

    ws.current.onclose = () => console.log('WebSocket 연결 해제');
    ws.current.onerror = (e) => console.error('WebSocket 에러', e);

    console.log(email ? `${email} 연결 시도중…` : '게스트 모드 연결 시도중…');
    setConnected(true);
  };

  const send = () => {
    if (!input.trim() || !connected) return;
    const now = formatTime(new Date());
    pushMsg('user', input.trim(), now);
    setIsLoading(true);

    if (!email) {
      const entry: GuestEntry = {
        MESSAGE_TYPE: 'user',
        MESSAGE: input.trim(),
        CREATED_AT: new Date().toISOString(),
      };
      guestHistoryRef.current.push(entry);
      localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
    }

    ws.current?.send(JSON.stringify({ type: 'user_message', message: input.trim() }));
    setInput('');
  };

  const handleQuestionClick = (q: string) => {
    setInput(q);
    send();
  };

  return (
    /* 화면 전체 래퍼 */
    <div className="h-screen w-full md:flex md:flex-row overflow-hidden">
      {/* 왼쪽 그라데이션 영역 */}
      <aside
        className="hidden md:flex md:w-1/2 h-full flex-none items-center justify-center"
        style={{
          background: 'linear-gradient(105deg,#BA0087 9.18%,#33059C 59.8%)',
        }}
      >
        <h2 className="font-bold leading-tight text-white text-[32px] lg:text-[48px] lg:leading-[64px] px-10">
          요금제, 고민하지 말고 <br />
          <span className="text-pink-400">
            U:<span className="text-white">Mate</span>
          </span>{' '}
          하세요.
        </h2>
      </aside>

      {/* ② – 오른쪽 : 챗봇 UI */}
      <div className="flex flex-col h-full flex-1 bg-background overflow-hidden">
        {/* 로그인/리서치 배너 */}
        <LoginBanner type="chatbot" />
        <LoginBanner type="research" />

        {/* floating button */}
        <button
          onClick={() => setShowResearch(true)}
          className="fixed bottom-28 right-4 px-4 py-2 rounded-lg bg-pink-500 text-white"
        >
          만족도 조사
        </button>

        {/* 이메일 입력 영역 (연결 전) */}
        {!connected && (
          <div className="p-4 bg-purple-600 border-b border-gray-200">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 입력 (빈칸=게스트)"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && connect()}
              />
              <button
                onClick={connect}
                className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              >
                연결하기
              </button>
            </div>
          </div>
        )}

        {/* 채팅창 */}
        <div className="flex-grow overflow-y-auto w-full px-0 pb-32 space-y-4">
          <ChatBubble from="bot" variant="first" time={formatTime(new Date())}>
            <FirstMessage onQuestionClick={handleQuestionClick} />
          </ChatBubble>
          {messages.map((m, i) => (
            <ChatBubble key={i} from={m.type} message={m.content} time={m.time ?? ''} />
          ))}
          {isLoading && <ChatBubble from="bot" message="..." time={formatTime(new Date())} />}
          <div ref={endRef} />
        </div>

        {/* 솔루션 리스트 BottomSheet */}
        {showBottomSheet && (
          <div className="fixed bottom-20 left-0 right-0 flex justify-end px-4 z-20">
            <BottomSheet
              isOpen={showBottomSheet}
              onClose={() => setShowBottomSheet(false)}
              height="auto"
              alignRight={true}
            >
              <SolutionList
                onSelect={(q) => {
                  setInput(q);
                  send();
                  setShowBottomSheet(false);
                }}
                selected={input}
              />
            </BottomSheet>
          </div>
        )}

        {/* 입력창 */}
        <div className="fixed bottom-0 left-0 md:left-1/2 right-0 z-10 p-4 bg-white border-t border-gray-200 shadow-[0_-3px_6px_rgba(0,0,0,0.1)]">
          <ChatbotInput
            value={input}
            onChange={setInput}
            onSend={send}
            onPlusClick={() => setShowBottomSheet(true)}
            disabled={!connected}
            placeholder="텍스트를 입력해주세요"
          />
        </div>

        {/* 리서치 BottomSheet */}
        {showResearch && (
          <div className="fixed bottom-20 left-0 right-0 flex justify-end px-4 z-20">
            <BottomSheet
              isOpen={showResearch}
              onClose={() => setShowResearch(false)}
              height="auto"
              alignRight
            >
              <Research
                onSubmit={(rating, feedback) => {
                  console.log('제출됨:', rating, feedback);
                  setShowResearch(false);
                }}
                onClose={() => setShowResearch(false)}
              />
            </BottomSheet>
          </div>
        )}
      </div>
    </div>
  );
}
