import ShortcutCard from './ShortcutCard';
import Modal from '../CallModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShortcutGrid = () => {
  /* 📌 모달 open 상태 */
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-6xl mx-auto p-4 mb-10">
        {/* 헤더 영역 */}
        <div className="mb-6">
          <h1 className="text-[58px] font-bold">
            <span className="text-pink-500">U: </span>
            <span className="text-black">Mate</span>
          </h1>
          <p className="text-lm">말만 걸어도 척척! LG U+ 요금제 도우미 유메이트</p>
        </div>

        {/* 카드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* (1) 대표 페이지 */}
          <ShortcutCard
            icon={
              <img
                src="/images/shortcut/shortcut-main-big.png"
                alt="대표 페이지"
                className="mt-14 w-full h-full object-contain"
              />
            }
            title="대표 페이지"
            description={
              '다양한 이벤트부터 요금제, 혜택, 비교까지\n 필요한 정보를 한 번에 확인하세요.'
            }
            route="/"
            width="w-full"
            height="h-full"
            iconSize="w-72 h-72"
            showButton={false}
            titleClassName="mt-14 text-[40px]"
            descriptionClassName="mt-3 text-lm"
            onClick={() => navigate('/')}
          />

          {/* (2) 우측 3개의 카드 */}
          <div className="flex flex-col gap-4 h-full">
            {/* 2-1. 고객센터 전화 – 모달 호출 */}
            <ShortcutCard
              icon={<img src="/images/shortcut/shortcut-phone.png" alt="고객센터 전화" />}
              title="고객센터 전화"
              description="상담원과 바로 연결해보세요."
              onClick={() => setOpen(true)} // 🔑
              width="w-full"
              height="h-full"
              iconSize="w-36 h-36"
              showButton={false}
              className="bg-diagonal"
            />

            {/* 2-2. 하단 두 개 */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <ShortcutCard
                icon={<img src="/images/shortcut/shortcut-webchatbot.svg" alt="상담봇" />}
                title="상담봇과 대화하기"
                description={'요금제부터 혜택까지\n궁금한 내용을 친절히 안내해 드려요.'}
                route="/chatbot"
                width="w-full"
                height="h-full"
                iconSize="w-36 h-36"
                showButton={false}
                titleClassName="text-lg"
              />

              <ShortcutCard
                icon={<img src="/images/shortcut/shortcut-looking.png" alt="요금제 살펴보기" />}
                title="요금제 살펴보기"
                description={'내게 꼭 맞는 요금제,\n 지금 바로 살펴보세요.'}
                route="/plans"
                width="w-full"
                height="h-full"
                iconSize="w-36 h-36"
                showButton={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 고객센터 모달 */}
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ShortcutGrid;
