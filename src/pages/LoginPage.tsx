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
    <div className="max-w-[600px] mx-auto overflow-x-hidden">
      {/*이미지 및 배너 */}
      <div className="w-full relative h-72 flex flex-col items-center justify-center z-0  ">
        <img
          src="/images/login/circle1.png"
          alt="배경"
          className="absolute -inset-x-1 inset-y-16 object-cover"
        />
        <img
          src="/images/login/circle2.png"
          alt="배경"
          className="absolute  left-[93%]  inset-y-24 object-cover"
        />
        <img
          src="/images/login/u1.png"
          alt="배경"
          className="absolute w-40 h-32 left-[10%]  rotate-[30deg] -inset-y-16 object-cover z-[-1]"
        />
        <img
          src="/images/login/u2.png"
          alt="배경"
          className="absolute w-32  left-[50%]  -inset-y-1 object-cover z-[-1]"
        />

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
      <div className="flex pt-6 justify-center gap-4 text-sm text-zinc-500 md:text-m lg:text-lm">
        <Link to="/" className="pr-4 border-r border-gray-300">
          아이디 / 비밀번호 찾기
        </Link>
        <Link to="/register" className="mr-4">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
