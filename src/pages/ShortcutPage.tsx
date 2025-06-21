import React from 'react';
import Button from '../components/Button';
import ShortcutCarousel from '../components/shortcut/ShortcutCarousel';
import ShortcutGrid from '../components/shortcut/ShortcutWeb';

const ShortCutPage: React.FC = () => {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-screen h-[300px] md:h-[500px] z-[-1] overflow-hidden  md:overflow-visible">
        {/* 왼쪽 원 */}
        <img
          src="/images/login/big-circle-2.png"
          alt="배경 원"
          className="absolute top-28 left-[-36px] object-cover w-16 md:top-80 md:w-40 md:left-[-80px] md:opacity-40 "
        />
        {/* 오른쪽 원 */}
        <img
          src="/images/login/big-circle-1.png"
          alt="배경 원"
          className="absolute top-48 right-[-65px] w-24 md:w-64 md:top-[calc(100%+150px)] md:right-[-100px] object-cover md:opacity-50"
        />
        {/* 위쪽 유자형 */}
        <img
          src="/images/login/big-u-1.png"
          alt="위쪽 유자형"
          className="absolute w-28 top-[-45px] left-[15%] rotate-[-2deg] md:w-52 md:top-[-90px] md:left-[30%] object-cover md:opacity-50"
        />
        {/* 아래쪽 유자형 */}
        <img
          src="/images/login/big-u-2.png"
          alt="아래쪽 유자형"
          className="
            absolute
            w-[71px] h-[80px]
            left-[4%] top-[75%]
            md:w-[140px] md:h-[154px]
            md:left-[25%] md:top-[calc(100%+190px)]
            object-cover
            md:rotate-[-8deg]
            md:opacity-50
          "
        />
        {/* 아래쪽 유자형 */}
        <img
          src="/images/login/big-u-3.png"
          alt="오른쪽 유자형"
          className="absolute w-36 top-[-32px] left-[60%] rotate-[9deg] md:w-72 md:top-[-10px] md:left-[70%] object-cover md:opacity-50"
        />
      </div>

      <div className="md:hidden">
        <div className="relative max-w-[600px] mx-auto z-10">
          <div className="w-full relative h-72 flex flex-col items-center justify-center z-0">
            <p className="relative font-bold text-[58px] mt-24">
              <span className="text-pink-500">U: </span>
              <span>Mate</span>
            </p>
            <p className="relative text-m text-center mt-2 max-[400px]:text-sm md:text-m">
              말만 걸어도 척척!
              <br />
              LG U+ 요금제 도우미 유메이트
            </p>
          </div>
          <div className="relative w-full overflow-x-visible">
            <div className="relative left-1/2 -translate-x-1/2 w-screen">
              <ShortcutCarousel />
            </div>
          </div>
        </div>
        <div className="mt-6 mb-6 flex justify-center">
          <Button
            variant="special"
            size="xl"
            className="w-80"
            onClick={() => console.log('고객센터 전화하기')}
          >
            고객센터 전화하기
          </Button>
        </div>
      </div>

      {/* 데스크탑 전용: 웹 그리드 */}
      <div className="hidden md:block">
        <ShortcutGrid />
      </div>
    </div>
  );
};

export default ShortCutPage;
