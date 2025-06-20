import { Link, useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useToast } from '../hooks/useToast';

const LoginPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValid = email.trim().length >= 10 && password.trim().length >= 12;
  const { showToast } = useToast();
  useEffect(() => {
    setHeaderConfig({
      title: '로그인',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  const ChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const ChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`${email}님 환영합니다`, 'black');
    console.log(email, password);
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-screen h-[300px] md:h-[500px] z-[-1] overflow-hidden">
        {/* 왼쪽 원 - 데스크탑에서 더 큼 */}
        <img
          src="/images/login/big-circle-2.png"
          alt="배경"
          className="absolute top-36 left-[-30px] object-cover w-16 md:top-44 md:w-28 md:left-[-60px]"
        />
        {/* 오른쪽 원 */}
        <img
          src="/images/login/big-circle-1.png"
          alt="배경"
          className="absolute top-36 right-[-70px] w-24 md:w-44 md:top-48 md:right-[-100px] object-cover"
        />
        {/* 왼쪽 유자형 */}
        <img
          src="/images/login/big-u-1.png"
          alt="배경"
          className="absolute w-32 top-4 left-[15%] rotate-[5deg] md:w-52 md:top-0 md:left-[10%] object-cover"
        />
        {/* 오른쪽 유자형 */}
        <img
          src="/images/login/big-u-3.png"
          alt="배경"
          className="absolute w-28 top-[80px] left-[55%] md:w-40 md:top-[90px] md:left-[75%] object-cover"
        />
      </div>
      {/* 실제 로그인 내용: 가운데 정렬 */}
      <div className="relative max-w-[600px] mx-auto z-10 md:mt-[-70px]">
        {/*배너 */}
        <div className="w-full relative h-72 flex flex-col items-center justify-center z-0  ">
          {/* 텍스트 */}
          <p className="relative text-xl font-bold mt-24  md:text-[40px]  ">
            <span className="text-pink-500">U: </span>
            <span>Mate 로그인</span>
          </p>
          <p className="relative text-m mt-2 max-[400px]:text-sm md:text-lm ">
            이메일 또는 휴대폰번호로 빠르게 로그인 하세요
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputField value={email} onChange={ChangeEmail} placeholder="이메일 또는 휴대폰 번호" />
          <InputField
            value={password}
            onChange={ChangePassword}
            placeholder="비밀번호"
            type="password"
          />
          <Button
            variant="fill"
            size="xl"
            fullWidth
            className="mt-8 rounded-xl h-16 sm:text-[1.3rem] md:text-lg "
            disabled={!isValid}
          >
            로그인
          </Button>
        </form>
        <div className="flex pt-6 justify-center gap-4 text-sm text-zinc-500 md:text-m lg:text-lm mb-6">
          <Link to="/" className="pr-4 border-r border-gray-300">
            아이디 / 비밀번호 찾기
          </Link>
          <Link to="/register" className="mr-4">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
