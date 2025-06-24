import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import ChatbotInput from '../components/ChatbotInput';
import FirstMessage from '../components/ChatbotFirstMessage';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SolutionList from '../components/BottomSheet/SolutionList';

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
    <div className="flex flex-col h-full bg-background">
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

      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-4">
        <ChatBubble from="bot" variant="first" time={formatTime(new Date())}>
          <FirstMessage onQuestionClick={handleQuestionClick} />
        </ChatBubble>
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.type} message={m.content} time={m.time ?? ''} />
        ))}
        <div ref={endRef} />
      </div>
      {showBottomSheet && (
        <div className="absolute bottom-20 left-0 right-0 z-20 px-4">
          <BottomSheet
            isOpen={showBottomSheet}
            onClose={() => setShowBottomSheet(false)}
            height="auto"
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
      <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white border-t border-gray-200 shadow-[0_-3px_6px_rgba(0,0,0,0.1)]">
        <ChatbotInput
          value={input}
          onChange={setInput}
          onSend={send}
          onPlusClick={() => setShowBottomSheet(true)}
          disabled={!connected}
          placeholder="텍스트를 입력해주세요"
        />
      </div>
    </div>
  );
}
