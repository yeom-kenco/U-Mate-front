import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HeaderProps } from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { SlArrowRight } from 'react-icons/sl';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import PlanList from '../components/BottomSheet/PlanList';
const RegisterPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [planopen, setPlanOpen] = useState(false); // 정렬 시트 토글
  const [isPlan, setisPlan] = useState(''); // 선택된 정렬 기준

  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    birth: '',
    phone: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    isPlan: '',
    agreements: '',
  });

  const validate = () => {
    const newErrors = {
      name: name.trim() === '' ? '이름을 입력해주세요.' : '',
      gender: gender.trim() === '' ? '성별을 선택해주세요.' : '',
      birth: /^\d{8}$/.test(birth) ? '' : '생년월일 8자리를 정확히 입력해주세요.',
      phone: /^010\d{8}$/.test(phone) ? '' : '휴대폰 번호를 정확히 입력해주세요.',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ''
        : '잘못된 형식의 이메일 주소입니다. 주소를 정확히 입력해주세요.',
      verificationCode: verificationCode.length === 6 ? '' : '인증번호 6자리를 입력해주세요.',
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/.test(password)
        ? ''
        : '영문 대 소문자, 숫자, 특수문자를 포함하여 12자 이상 입력해주세요.',
      confirmPassword: confirmPassword === password ? '' : '비밀번호가 일치하지 않습니다.',
      isPlan: isPlan.trim() === '' ? '사용/관심 요금제 선택해주세요.' : '',
      agreements: agreements.all === false ? '이용약관을 모두 동의해 주세요' : '',
    };
    setErrors(newErrors);
    // 에러가 하나라도 있으면 false 반환
    return Object.values(newErrors).every((msg) => msg === '');
  };

  //체크박스 관리
  const [agreements, setAgreements] = useState({
    all: false,
    privacy: false,
    delegate: false,
    terms: false,
  });

  const handleCheckChange = (id: string, value: boolean) => {
    // 전체 동의 선택 시, 모든 항목을 동일하게
    if (id === 'all') {
      setAgreements({
        all: value,
        privacy: value,
        delegate: value,
        terms: value,
      });
    } // 개별 항목 선택 시, 그 항목만 선택
    else {
      const newAgreements = { ...agreements, [id]: value };
      // 개별 항목들이 모두 true면 전체동의도 true로
      const allChecked = newAgreements.privacy && newAgreements.delegate && newAgreements.terms;
      setAgreements({ ...newAgreements, all: allChecked });
    }
  };

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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
  };
  return (
    <form onSubmit={onSubmit} className="w-full max-w-[600px] mx-auto px-4 py-6">
      <p className="text-lg font-bold mb-4 w-40">본인인증 정보를 입력해주세요.</p>
      <InputField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        required
        error={errors.name}
      />
      {/* 성별 선택 */}
      <label className="text-s  text-gray-400">
        <span>성별</span> <span className="text-pink-500">*</span>
      </label>
      <div className="flex gap-4 my-2">
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
      <p className="text-xs text-pink-500 mb-2">{errors.gender}</p>
      <InputField
        label="생년월일"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        placeholder="생년월일 8자리 (YYYYMMDD)"
        required
        error={errors.birth}
      />
      <InputField
        label="휴대폰번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="'-'없이 입력(예:01012345678)"
        suffixButton="중복 확인"
        required
        error={errors.phone}
      />
      <InputField
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 (예: lguplus@google.com)"
        type="email"
        suffixButton="이메일 인증"
        required
        error={errors.email}
      />
      <InputField
        label="이메일 인증번호"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="인증번호 6자리 입력"
        suffixButton="인증 확인"
        required
        error={errors.verificationCode}
      />
      <InputField
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        type="password"
        required
        error={errors.password}
      />
      <InputField
        label="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        type="password"
        required
        error={errors.confirmPassword}
      />
      {/*요금제 선택 박스 */}
      <label className="text-s text-gray-400">
        <span className="">
          사용중인 요금제/관심 요금제 <span className="text-pink-500">*</span>
        </span>
      </label>
      <div
        className="flex justify-between my-2 items-center w-full border border-zinc-500 rounded-lg px-2 py-2 bg-background cursor-pointer
      hover:bg-slate-200"
        onClick={() => setPlanOpen(true)}
      >
        <p className="text-s max-w-[400px]:text-xs mt-[4px]">
          {isPlan || '요금제를 선택해주세요.'}{' '}
        </p>
        <SlArrowRight />
      </div>
      <p className="text-xs text-pink-500 mb-2">{errors.isPlan}</p>
      {/* 약관 동의*/}
      <div className="mt-8 space-y-4 mb-2">
        <CheckBox
          id="all"
          title="전체 동의"
          showButton={false}
          checked={agreements.all}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="privacy"
          title="개인정보 수집 및 이용 동의(필수)"
          checked={agreements.privacy}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="delegate"
          title="개인정보 처리 위탁 동의(필수)"
          checked={agreements.delegate}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="terms"
          title="서비스 이용 약관 동의(필수)"
          checked={agreements.terms}
          onChange={handleCheckChange}
        />
      </div>
      <p className="text-xs text-pink-500 mb-2">{errors.agreements}</p>
      <Button size="xl" fullWidth className="mt-6 rounded-xl h-14">
        회원가입
      </Button>

      <BottomSheet isOpen={planopen} onClose={() => setPlanOpen(false)} height="700px">
        <PlanList onSelect={handlePlanSelect} selected={isPlan} />
      </BottomSheet>
    </form>
  );
};

export default RegisterPage;
