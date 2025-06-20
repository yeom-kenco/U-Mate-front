import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HeaderProps } from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { SlArrowRight } from 'react-icons/sl';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
const RegisterPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [plans, setPlans] = useState('');
  const [planopen, setPlanOpen] = useState(false); // 정렬 시트 토글
  const [isPlan, setisPlan] = useState(''); // 선택된 정렬 기준

  const handlePlanSelect = (value: string) => {
    setisPlan(value);
    setPlanOpen(false);
  };

  useEffect(() => {
    setHeaderConfig({
      title: '회원가입',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <p className="text-lg font-bold mb-4 w-40">본인인증 정보를 입력해주세요.</p>
      <InputField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        required
      />
      {/* 성별 선택 */}
      <label className="text-s mb-[-5px] text-gray-400">
        <span>성별</span> <span className="text-pink-500">*</span>
      </label>
      <div className="flex gap-4 my-4">
        <Button
          variant={gender === 'male' ? 'fill' : 'outline'}
          color="pink"
          size="lg"
          onClick={() => setGender('male')}
          className="w-1/2"
        >
          남성
        </Button>
        <Button
          variant={gender === 'female' ? 'fill' : 'outline'}
          color="pink"
          size="lg"
          onClick={() => setGender('female')}
          className="w-1/2"
        >
          여성
        </Button>
      </div>
      <InputField
        label="생년월일"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        placeholder="생년월일 8자리 (YYYYMMDD)"
        required
      />
      <InputField
        label="휴대폰번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="'-'없이 입력(예:01012345678)"
        suffixButton="중복 확인"
        required
      />
      <InputField
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 (예: lguplus@google.com)"
        type="email"
        suffixButton="이메일 인증"
        required
      />
      <InputField
        label="이메일 인증번호"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="인증번호 6자리 입력"
        suffixButton="인증 확인"
        required
      />
      <InputField
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        type="password"
        required
      />
      <InputField
        label="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        type="password"
        required
      />
      <label className="text-s text-gray-400">
        <span className="">사용중인 요금제/관심 요금제</span>
      </label>
      <div
        className="flex justify-between items-center w-full border border-zinc-500 rounded-lg px-2 py-2 bg-background cursor-pointer
      hover:bg-slate-200"
        onClick={() => setPlanOpen(true)}
      >
        <p className="text-sm mt-[4px]">요금제를 선택해주세요</p>
        <SlArrowRight />
      </div>
      {/* 약관 동의: 별도 컴포넌트로 분리 가능 */}
      <div className="mt-8 space-y-4">
        <CheckBox showButton={false} />
        <CheckBox title="개인정보 수집 및 이용 동의(필수)" showButton />
        <CheckBox title="개인정보 처리 위탁 동의(필수)" showButton />
        <CheckBox title="서비스 이용 약관 동의(필수)" showButton />
      </div>
      <Button size="xl" fullWidth className="mt-6 rounded-xl h-14">
        회원가입
      </Button>

      <BottomSheet isOpen={planopen} onClose={() => setPlanOpen(false)} height="500px">
        <SortList onSelect={handlePlanSelect} selected={isPlan} />
      </BottomSheet>
    </div>
  );
};

export default RegisterPage;
