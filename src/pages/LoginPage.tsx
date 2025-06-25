import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { HeaderProps } from '../components/Header';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useToast } from '../hooks/useToast';
import { login, validateToken } from '../apis/auth';
import FindAccountModal from '../components/Modal/FindAccountModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../store/modalSlice';
import { RootState } from '../store/store';
import { useAppSelector } from '../hooks/reduxHooks';
import { setUser } from '../store/userSlice';

const LoginPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidPhone = /^\d{10,11}$/;
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
  const { showToast } = useToast();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    setHeaderConfig({
      title: '로그인',
      showBackButton: true,
      showSearch: false,
      hasShadow: true,
    });
  }, [setHeaderConfig]);

  const ChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const ChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (email.trim() === '') {
      newErrors.email = '이메일 또는 휴대폰 번호를 입력해주세요.';
    } else if (!isValidEmail.test(email) && !isValidPhone.test(email)) {
      newErrors.email = '올바른 이메일 또는 휴대폰 번호 형식이 아닙니다.';
    }

    if (!password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!isValidPassword.test(password)) {
      newErrors.password =
        '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 12자 이상 입력해주세요.';
    }

    setErrors(newErrors);
    // 하나도 없어야 통과
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await login({ id: email, password });
      showToast(res.data.message, 'black');
      const token = await validateToken();
      dispatch(setUser(token.data.user));
      navigate('/');
    } catch (err: any) {
      console.log(err);
      //showToast(err.response.data.error, 'error');
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute w-full top-[-60px] left-0 h-[300px] md:h-[500px] z-[-1] overflow-hidden">
        {/* 왼쪽 원 - 데스크탑에서 더 큼 */}
        <img
          src="images/login/big-circle-2.png"
          alt="배경"
          className="absolute top-36 left-[-30px] object-cover w-16 md:top-44 md:w-28 md:left-[-60px]"
        />
        {/* 오른쪽 원 */}
        <img
          src="images/login/big-circle-1.png"
          alt="배경"
          className="absolute top-36 right-[-70px] w-24 md:w-44 md:top-48 md:right-[-100px] object-cover"
        />
        {/* 왼쪽 유자형 */}
        <img
          src="images/login/big-u-1.png"
          alt="배경"
          className="absolute w-32 top-4 left-[15%] rotate-[5deg] md:w-52 md:top-0 md:left-[10%] object-cover"
        />
        {/* 오른쪽 유자형 */}
        <img
          src="images/login/big-u-3.png"
          alt="배경"
          className="absolute w-28 top-[80px] left-[55%] md:w-40 md:top-[90px] md:left-[75%] object-cover"
        />
      </div>
      {/* 실제 로그인 내용: 가운데 정렬 */}
      <div className="relative max-w-[372px] w-[90%] mx-auto z-10 md:mt-[-70px]">
        {/*배너 */}
        <div className="w-full relative h-72 flex flex-col items-center justify-center z-0  ">
          {/* 텍스트 */}
          <p className="relative text-xl font-bold mt-24  md:text-4xl">
            <span className="text-pink-500">U: </span>
            Mate 로그인
          </p>
          <p className="relative text-m mt-4 max-[400px]:text-sm md:text-lm ">
            이메일 또는 휴대폰번호로 빠르게 로그인 하세요
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputField
            value={email}
            onChange={ChangeEmail}
            placeholder="이메일 또는 휴대폰 번호"
            error={errors.email}
            placeholderStyle="text-[16px] max-[400px]:text-sm"
          />
          <InputField
            value={password}
            onChange={ChangePassword}
            placeholder="비밀번호"
            type="password"
            error={errors.password}
            placeholderStyle="text-[16px] max-[400px]:text-sm"
          />
          <Button
            variant="fill"
            size="xl"
            fullWidth
            className="mt-8 rounded-xl h-16 sm:text-lm w-full"
          >
            로그인
          </Button>
        </form>
        <div className="flex pt-8 justify-center gap-4 text-sm text-zinc-500 md:text-m lg:text-m mb-6">
          <span onClick={() => dispatch(openModal())} className="pr-4 border-r border-gray-300">
            아이디 / 비밀번호 찾기
          </span>
          <Link to="/signup" className="mr-4">
            회원가입
          </Link>
        </div>
      </div>
      {isOpen && <FindAccountModal onClose={() => dispatch(closeModal())} />}
    </div>
  );
};

export default LoginPage;
