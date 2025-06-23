import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ChatbotButton from '../components/ChatbotButton';
import ChatBubble from '../components/ChatBubble';

type Message = {
  type: 'system' | 'user' | 'bot';
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

  // --- 상태 관리 ---
  const [email, setEmail] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'system',
      content:
        'UMate AI Assistant에 오신 것을 환영합니다!\n' +
        '이메일을 입력하고 연결하면 이전 대화 내역이 자동으로 로드합니다.',
    },
  ]);
  const [optInfo, setOptInfo] = useState<{ firstSession: boolean; count: number } | null>(null);
  const [input, setInput] = useState<string>('');

  // 웹소켓 레퍼런스
  const ws = useRef<WebSocket | null>(null);
  // 스크롤 끝 레퍼런스
  const endRef = useRef<HTMLDivElement>(null);

  // --- 게스트 히스토리 레퍼 ---
  const guestHistoryRef = useRef<GuestEntry[]>(
    JSON.parse(localStorage.getItem('guestChat') || '[]')
  );

  // 메시지가 바뀔 때마다 자동 스크롤
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 푸시
  const pushMsg = (type: Message['type'], content: string, time?: string) => {
    setMessages((m) => [...m, { type, content, time }]);
  };
  const pushSys = (content: string) => {
    setMessages((m) => [...m, { type: 'system', content }]);
  };

  // connect 함수
  const connect = () => {
    if (email && !email.includes('@')) {
      alert('올바른 이메일을 입력해주세요');
      return;
    }

    if (!email && guestHistoryRef.current.length) {
      pushSys(`💬 로컬에 저장된 대화 ${guestHistoryRef.current.length}개 불러옴`);
      guestHistoryRef.current.forEach((entry) => {
        const from: Message['type'] = entry.MESSAGE_TYPE === 'assistant' ? 'bot' : 'user';
        pushMsg(from, entry.MESSAGE, new Date(entry.CREATED_AT).toLocaleTimeString());
      });
    }

    const qs = email ? `email=${encodeURIComponent(email)}&history=true` : 'history=false';
    ws.current = new WebSocket(`wss://seungwoo.i234.me:3333/realtime-chat?${qs}`);

    ws.current.onopen = () => {
      setConnected(true);
      pushSys('🟢 연결됨');
    };
    ws.current.onmessage = (ev) => {
      let data;
      try {
        data = JSON.parse(ev.data);
      } catch {
        return;
      }
      handleServer(data);
    };
    ws.current.onclose = () => {
      setConnected(false);
      pushSys('🔴 연결 끊김');
    };
    ws.current.onerror = () => {
      setConnected(false);
      pushSys('🔴 연결 오류');
    };

    pushSys(email ? `${email} 로 연결을 시도합니다…` : '게스트 모드로 연결을 시도합니다…');
  };

  // 서버 메시지 핸들러
  const handleServer = (data: any) => {
    switch (data.type) {
      case 'connection': {
        const hist: any[] = data.chatHistory || [];
        setOptInfo({ firstSession: hist.length === 0, count: hist.length });
        if (hist.length) {
          pushSys(`💬 서버에서 이전 대화 ${hist.length}개 불러왔습니다.`);
          hist.forEach((h) =>
            pushMsg(
              h.MESSAGE_TYPE === 'assistant' ? 'bot' : 'user',
              h.MESSAGE,
              new Date(h.CREATED_AT).toLocaleTimeString()
            )
          );
        }
        break;
      }
      // --- 서버 메시지 핸들러의 text_done 케이스 ---
      case 'text_done':
        pushMsg('bot', data.text, new Date().toLocaleTimeString());
        if (!email) {
          // <-- 마찬가지로 타입을 명시해 줍니다.
          const entry: GuestEntry = {
            MESSAGE_TYPE: 'assistant', // 정확히 'assistant'
            MESSAGE: data.text,
            CREATED_AT: new Date().toISOString(),
          };
          guestHistoryRef.current.push(entry);
          localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
        }
        break;

      case 'error':
        pushSys(`❌ 오류: ${data.error}`);
        break;
    }
  };

  // --- 메시지 전송 ---
  const send = () => {
    if (!input.trim() || !connected) return;

    // 1) 화면에 바로 반영
    const now = new Date().toLocaleTimeString();
    pushMsg('user', input.trim(), now);

    // 2) 게스트라면 로컬스토리지에도 저장
    if (!email) {
      const entry: GuestEntry = {
        MESSAGE_TYPE: 'user',
        MESSAGE: input.trim(),
        CREATED_AT: new Date().toISOString(),
      };
      guestHistoryRef.current.push(entry);
      localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
    }

    // 3) 서버로 전송
    ws.current?.send(JSON.stringify({ type: 'user_message', message: input.trim() }));
    setInput('');
  };

  // Enter 키 핸들링
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="relative min-h-screen p-4">
      <div className="absolute bottom-8 right-8">
        <ChatbotButton />
      </div>

      <div className="mx-auto w-[90%] max-w-2xl h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* 로그인/게스트 영역 */}
        {!connected && (
          <div className="p-5 bg-gray-100 border-b border-gray-200">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="이메일 입력 (빈칸=게스트)"
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                onClick={connect}
              >
                연결하기
              </button>
            </div>
          </div>
        )}

        {/* 최적화 정보 */}
        {optInfo && (
          <div
            className={`text-xs text-center p-2 ${optInfo.firstSession ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}
          >
            {optInfo.firstSession
              ? '🆕 새 세션: 첫 메시지에는 유저 정보 포함'
              : `✨ 이전 대화 ${optInfo.count}개 로드됨`}
          </div>
        )}

        {/* 채팅 영역 */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-100">
          {messages.map((m, i) => (
            <ChatBubble
              key={i}
              from={m.type === 'user' ? 'user' : 'bot'}
              message={m.content}
              time={m.time || ''}
            />
          ))}
          <div ref={endRef} />
        </div>

        {/* 메시지 입력창: 항상 보여줌 */}
        <div className="p-5 bg-white border-t border-gray-200">
          <div className="flex gap-3 flex-wrap mb-4">
            <button
              className="px-3 py-1 border border-gray-300 rounded-full text-xs hover:bg-gray-100"
              onClick={() => setMessages([{ type: 'system', content: '채팅이 정리되었습니다.' }])}
            >
              채팅 정리
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-full text-xs hover:bg-gray-100"
              onClick={() => setOptInfo((o) => (o ? { ...o, firstSession: !o.firstSession } : o))}
            >
              📊 최적화 정보
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-full text-xs hover:bg-gray-100"
              onClick={() => pushSys(`🔗 연결 상태: ${connected ? '정상' : '끊김'}`)}
            >
              🔗 연결 테스트
            </button>
          </div>
          <div className="flex gap-3 items-end">
            <textarea
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-[25px] text-sm resize-none focus:border-blue-500 outline-none min-h-[44px] max-h-[120px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={onKey}
              rows={1}
            />
            <button
              className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center disabled:bg-gray-300"
              onClick={send}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
