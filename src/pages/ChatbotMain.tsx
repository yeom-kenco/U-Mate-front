import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import ChatbotInput from '../components/ChatbotInput';
import FirstMessage from '../components/ChatbotFirstMessage';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SolutionList from '../components/BottomSheet/SolutionList';
import LoginBanner from '../components/LoginBanner';
import ResearchBanner from '../components/ResearchBanner';
import Research from '../components/BottomSheet/Research';
import { useAppSelector } from '../hooks/reduxHooks';
import { resetHistory } from '../apis/ChatApi';

/* 타입 선언 */
type Message = { type: 'user' | 'bot'; content: string; time?: string };
type GuestEntry = { MESSAGE_TYPE: 'user' | 'assistant'; MESSAGE: string; CREATED_AT: string };

export default function ChatbotMain() {
  /* 헤더 */
  const setHeaderConfig = useOutletContext<(c: HeaderProps) => void>();
  useEffect(() => {
    setHeaderConfig({ title: 'U:M 상담챗봇', showBackButton: true, showSearch: true });
  }, [setHeaderConfig]);

  /* 전역 상태 */
  const { email: userEmail } = useAppSelector((state) => state.user);

  /* 로컬 상태 */
  const [email, setEmail] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [surveyDone, setSurveyDone] = useState(
    () => localStorage.getItem('surveySubmitted') === 'true'
  );
  const isConnecting = useRef(false);

  const ws = useRef<WebSocket | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const guestHistoryRef = useRef<GuestEntry[]>(
    JSON.parse(localStorage.getItem('guestChat') || '[]')
  );

  const timeFmt = (d = new Date()) =>
    d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

  const pushMsg = (type: Message['type'], content: string, time = timeFmt()) =>
    setMessages((m) => [...m, { type, content, time }]);

  /* ───────────────── WebSocket open/close ───────────────── */
  const openWS = (addr: string) => {
    ws.current = new WebSocket(addr);

    ws.current.onopen = () => {
      setConnected(true);
    };

    ws.current.onclose = () => {
      setConnected(false);
    };

    ws.current.onerror = (e) => console.error('WS error', e);

    ws.current.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);

        /* 최초 connection : 서버가 보낸 chatHistory 렌더링 */
        if (data.type === 'connection' && Array.isArray(data.chatHistory)) {
          data.chatHistory.forEach((row: any) => {
            const from: Message['type'] = row.MESSAGE_TYPE === 'user' ? 'user' : 'bot';
            pushMsg(from, row.MESSAGE, timeFmt(new Date(row.CREATE_AT)));
          });
          return;
        }

        /* AI 답변 완료 */
        if (data.type === 'text_done') {
          pushMsg('bot', data.text);
          setIsLoading(false);

          // 게스트일 때만 localStorage 저장
          if (!email) {
            guestHistoryRef.current.push({
              MESSAGE_TYPE: 'assistant',
              MESSAGE: data.text,
              CREATED_AT: new Date().toISOString(),
            });
            localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
          }
        }
      } catch {}
    };
  };
  const connect = (emailForWS?: string) => {
    if (isConnecting.current || (ws.current && ws.current.readyState < WebSocket.CLOSING)) {
      return;
    }
    isConnecting.current = true;
    setConnected(false);

    const usedEmail = emailForWS ?? '';
    const query = usedEmail
      ? `email=${encodeURIComponent(usedEmail)}&history=true`
      : 'history=false';
    const url = `wss://seungwoo.i234.me:3333/realtime-chat?${query}`;

    // 게스트: localStorage 히스토리 먼저 출력
    if (!usedEmail && guestHistoryRef.current.length) {
      guestHistoryRef.current.forEach(({ MESSAGE_TYPE, MESSAGE, CREATED_AT }) =>
        pushMsg(
          MESSAGE_TYPE === 'assistant' ? 'bot' : 'user',
          MESSAGE,
          timeFmt(new Date(CREATED_AT))
        )
      );
    }

    openWS(url);
  };

  /* 로그인·로그아웃 / email 변경 감시 */
  useEffect(() => {
    // 로그인
    if (userEmail) {
      setEmail(userEmail);
      if (ws.current?.readyState === WebSocket.OPEN) ws.current.close(); // ①
      connect(userEmail); // ②
    }
    // 게스트
    else {
      if (ws.current?.readyState === WebSocket.OPEN) ws.current.close();
      connect();
    }
  }, [userEmail]);

  /* 최신 메시지 스크롤 */
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  /*  메시지 전송  */
  const send = () => {
    if (!input.trim() || !connected) return;

    const trimmed = input.trim();
    pushMsg('user', trimmed);
    setIsLoading(true);

    // 게스트 localStorage 저장
    if (!email) {
      guestHistoryRef.current.push({
        MESSAGE_TYPE: 'user',
        MESSAGE: trimmed,
        CREATED_AT: new Date().toISOString(),
      });
      localStorage.setItem('guestChat', JSON.stringify(guestHistoryRef.current));
    }

    const payload = email
      ? { type: 'user_message', message: trimmed, email }
      : { type: 'user_message', message: trimmed };

    ws.current?.send(JSON.stringify(payload));
    setInput('');
  };

  const onPickQ = (q: string) => {
    setInput(q);
    send();
  };

  // 리셋 버튼 클릭 시 실행될 함수
  const handleReset = async () => {
    if (!userEmail) return;
    try {
      await resetHistory({ email: userEmail }); // 리셋 요청
      window.location.reload(); // 한 번만 리로드
    } catch (e) {
      console.error('리셋 실패:', e);
    }
  };

  return (
    <div
      className="w-full md:flex md:flex-row overflow-hidden"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* 좌측 배경 */}
      <aside
        className="hidden md:flex md:w-1/3 h-full flex-col justify-between items-center py-10"
        style={{ background: 'linear-gradient(105deg,#BA0087 9.18%,#33059C 59.8%)' }}
      >
        <div className="flex-1 flex items-center justify-center w-full px-10">
          <h2 className="font-bold leading-tight text-white text-[32px] lg:text-[48px] lg:leading-[64px]">
            요금제, 고민하지 말고
            <br />
            <span className="text-pink-400">
              U:<span className="text-white">Mate</span>
            </span>{' '}
            하세요.
          </h2>
        </div>
      </aside>

      {/* 우측 챗봇 */}
      <div className="flex flex-col h-full flex-1 bg-background overflow-hidden">
        {!userEmail && <LoginBanner type="chatbot" />}
        {!surveyDone && <ResearchBanner onSurveyClick={() => setShowResearch(true)} />}

        {/* 채팅창 */}
        <div className="flex-grow overflow-y-auto w-full p-4 pb-32 space-y-4">
          <ChatBubble from="bot" variant="first" time={timeFmt()}>
            <FirstMessage onQuestionClick={onPickQ} />
          </ChatBubble>

          {messages.map((m, i) => (
            <ChatBubble key={i} from={m.type} message={m.content} time={m.time} />
          ))}

          {isLoading && <ChatBubble from="bot" message="..." time={timeFmt()} />}
          <div ref={endRef} />
          {/* 초기화 버튼 */}
          <button
            onClick={handleReset}
            className="fixed bottom-28 right-6 z-20 w-12 h-12 text-s rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition"
            aria-label="초기화"
          >
            초기화
          </button>
        </div>

        {/* 빠른 질문 BottomSheet */}
        {showBottomSheet && (
          <div className="fixed bottom-20 inset-x-0 flex justify-end px-4 z-20">
            <BottomSheet isOpen height="auto" alignRight onClose={() => setShowBottomSheet(false)}>
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
        <div className="fixed bottom-0 left-0 md:left-1/3 right-0 z-10 p-4 bg-white border-t border-gray-200 shadow-[0_-3px_6px_rgba(0,0,0,0.1)]">
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
          <div className="fixed bottom-20 inset-x-0 px-4 z-30">
            <BottomSheet isOpen height="auto" alignRight onClose={() => setShowResearch(false)}>
              <Research
                onSubmit={(rating, feedback) => {
                  console.log('리서치 제출:', rating, feedback);
                  setSurveyDone(true);
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
