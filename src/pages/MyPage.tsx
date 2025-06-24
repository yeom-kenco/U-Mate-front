import { useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { useEffect, useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { checkPassword } from '../apis/auth';
import { useSelector } from 'react-redux';
const MyPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const user = useSelector((state) => state.user);
  const [password, setPassword] = useState<string>('');
  useEffect(() => {
    setHeaderConfig({
      title: '마이페이지',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  const handlePasswordCheck = async () => {
    if (!user || !password) {
      return;
    }
    try {
      const res = await checkPassword({ email: user.email, password });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen pt-10  bg-background">
      <div className="flex flex-col justify-center items-center w-[90%] mx-auto gap-3">
        <div className="overflow-hidden ">
          <img src="/images/bear/gom.png" alt="" className="w-20 h-20 mx-auto mb-2" />
        </div>
        <p className="text-lm font-semibold">
          <span className="text-pink-500">OOO님</span> 안녕하세요
        </p>
        <div className="flex flex-col bg-diagonal w-full h-32 rounded-xl py-4 px-4 ">
          <p className="text-sm text-zinc-800">사용하고 있는 요금제 (관심 요금제)</p>
          <p className="text-lg font-semibold text-violet-500">5G 프리미어 에센셜</p>
          <div className="flex items-end">
            <p className="text-lg font-semibold flex-1">월 85,500원</p>
            <div className="flex  items-center  justify-end text-xs">
              <p>요금제 자세히보기</p>
              <SlArrowRight className="w-2 h-4 " />
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full  ">
          <Button variant="outline" color="gray" size="lg" className="flex-1 text-sm">
            내가 작성한 리뷰 보기
          </Button>
          <Button variant="fill" color="violet" size="lg" className="flex-1 text-sm bg-violet-100">
            요금제 리뷰 작성하기
          </Button>
        </div>
      </div>
      <div className="bg-violet-50 mt-12 flex flex-col rounded-xl gap-2 min-h-48 text-center w-[90%] mx-auto">
        <p className="mt-6 text-m font-semibold">회원 정보</p>
        <p className="text-s text-zinc-800">고객 정보 보호를 위해 비밀번호 확인이 필요합니다.</p>
        <div className="w-4/5 mx-auto">
          <InputField
            variant="box"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </div>
        <Button
          color="pink"
          onClick={handlePasswordCheck}
          variant="fill"
          size="m"
          className="w-20 self-center"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
