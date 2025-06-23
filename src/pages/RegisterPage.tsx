import { useNavigate, useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { HeaderProps } from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { SlArrowRight } from 'react-icons/sl';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import PlanList from '../components/BottomSheet/PlanList';
import { signUp } from '../apis/auth';
import { formatBirth } from '../utils/formatBirth';
import { CodeCheckButton, EmailSendButton, PhoneCheckButton } from '../components/suffixButtons';
import { ToastContext } from '../context/ToastContext';
import { formatTime } from '../utils/formatTimer';
const RegisterPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const [planopen, setPlanOpen] = useState(false); // 정렬 시트 토글
  const [isPlan, setisPlan] = useState(''); // 선택한 요금제
  // 입력값
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birth: '',
    phone: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  // 휴대폰 중복 확인 여부
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  // 이메일 인증버튼 클릭 여부
  const [isEmailClickd, setIsEmailClickd] = useState(false);

  // 타이머 3분
  const [timer, setTimer] = useState<number>(180);
  const [isCounting, setIsCounting] = useState<boolean>(false); // 타이머 동작 여부
  // 이메일 인증코드 확인 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  //에러 Record사용하여 string string 으로 ex ) : name,name의 에러 메세지
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 입력값 유효성검사 ex ) : (name ,name필드 입력값)
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return /^[가-힣]{2,5}$/.test(value) ? '' : '이름은 한글로 2~5자 이내로 입력해주세요.';
      case 'birth':
        return /^\d{8}$/.test(value) ? '' : '생년월일 8자리를 정확히 입력해주세요.';
      case 'phone':
        return /^\d{10,11}$/.test(value) ? '' : '휴대폰 번호를 정확히 입력해주세요.';
      case 'email':
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())
          ? ''
          : '이메일 형식이 올바르지 않습니다.';
      case 'verificationCode':
        return value.length === 6 ? '' : '인증번호 6자리를 입력해주세요.';
      case 'password':
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,20}$/.test(value)
          ? ''
          : '영문 대문자,소문자, 숫자, 특수문자를 포함하여 12자 이상 입력해주세요.';
      case 'confirmPassword':
        return value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '';
      case 'gender':
        return value === '' ? '성별을 선택해주세요.' : '';
      default:
        return '';
    }
  };

  // 변경할때 마다 유효성검사로 에러 메세지 출력
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
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

  // 요금제 선택 시 요금제 선택 및 바텀시트 닫힘
  const handlePlanSelect = (value: string) => {
    setisPlan(value);
    setPlanOpen(false);
  };

  //마운트 시 헤더 변경
  useEffect(() => {
    setHeaderConfig({
      title: '회원가입',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  // 제출 시 모든 유효성검사 다시 실시
  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    // 모든 formData 돌면서 유효성 검사 유효성 틀릴 시 에러메세지 추가
    Object.entries(formData).forEach(([key, value]) => {
      newErrors[key] = validateField(key, value);
    });
    // 약관동의 모두 체크 안할 시 에러
    newErrors.agreements = agreements.all ? '' : '이용약관을 동의해주세요.';
    // 요금제 선택 안할 시 에러
    newErrors.isPlan = isPlan === '' ? '요금제를 선택해주세요' : '';

    //휴대폰 중복,이메일 인증 클릭 이메일 인증 회원가입 시 확인
    if (!isPhoneChecked) {
      newErrors.phone = '휴대폰 중복확인을 해주세요.';
    }
    if (!isEmailClickd) {
      newErrors.email = '이메일 인증을 완료해주세요.';
    }
    if (!isEmailVerified) {
      newErrors.verificationCode = '이메일 인증을 완료해주세요.';
    }
    setErrors(newErrors);
    // 하나라도 에러가 있다면 false
    return Object.values(newErrors).every((e) => e === '');
  };

  // 회원가입
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 전체 유효성 검사
    const allValid = validateAll();

    if (!allValid) return;
    //성공 로직
    const requestData = {
      name: formData.name,
      gender: formData.gender as 'M' | 'F',
      birthDay: formData.birth,
      phoneNumber: formData.phone,
      email: formData.email,
      password: formData.password,
      phonePlan: 1,
    };
    console.log(requestData);
    try {
      const res = await signUp(requestData);
      //성공시
      if (res.data.success) {
        toastContext?.showToast(res.data.message, 'black');
        navigate('/login'); //로그인페이지 이동
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 인증 후  email필드 변경 시 다시 인증해야함
  useEffect(() => {
    setIsEmailVerified(false);
  }, [formData.email]);

  // 휴대폰 중복 확인 후 phone필드  변경 시 다시 중복확인
  useEffect(() => {
    setIsPhoneChecked(false);
  }, [formData.phone]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (isCounting && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsCounting(false); // 타이머 종료
    }

    return () => clearInterval(countdown);
  }, [isCounting, timer]);

  return (
    <form onSubmit={onSubmit} className=" w-[90%] max-w-[600px] mx-auto px-4 py-6">
      <p className="text-lg font-bold mb-4 w-40">본인인증 정보를 입력해주세요.</p>
      <InputField
        label="이름"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
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
          type="button"
          variant={formData.gender === 'M' ? 'fill' : 'outline'}
          color="pink"
          size="lg"
          onClick={() => {
            handleChange('gender', 'M');
          }}
          className="w-1/2"
        >
          남성
        </Button>
        <Button
          type="button"
          variant={formData.gender === 'F' ? 'fill' : 'outline'}
          color="pink"
          size="lg"
          onClick={() => {
            handleChange('gender', 'F');
          }}
          className="w-1/2"
        >
          여성
        </Button>
      </div>
      <p className="text-xs md:text-s text-pink-500 mb-2">{errors.gender}</p>
      <InputField
        label="생년월일"
        value={formData.birth}
        onChange={(e) => handleChange('birth', e.target.value)}
        placeholder="생년월일 8자리 (YYYYMMDD)"
        required
        error={errors.birth}
      />
      <InputField
        label="휴대폰번호"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder="'-'없이 입력(예:01012345678)"
        suffixButton={
          <PhoneCheckButton
            phoneNumber={formData.phone}
            setError={(field, msg) => setErrors((prev) => ({ ...prev, [field]: msg }))}
            setSuccessFlag={setIsPhoneChecked} // 휴대폰 중복확인 체크여부
          />
        }
        required
        error={errors.phone}
      />

      <InputField
        label="이메일"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="이메일 (예: lguplus@google.com)"
        type="email"
        suffixButton={
          <EmailSendButton
            email={formData.email}
            setError={(field, msg) => setErrors((prev) => ({ ...prev, [field]: msg }))}
            setSuccessFlag={setIsEmailClickd} // 이메일 인증 클릭 여부
            Timer={setTimer}
            Counting={setIsCounting}
          />
        }
        required
        error={errors.email}
      />
      {isEmailClickd && (
        <InputField
          label="이메일 인증번호"
          value={formData.verificationCode}
          onChange={(e) => handleChange('verificationCode', e.target.value)}
          placeholder="인증번호 6자리 입력"
          suffixButton={
            <CodeCheckButton
              email={formData.email}
              code={formData.verificationCode}
              setError={(field, msg) => setErrors((prev) => ({ ...prev, [field]: msg }))}
              setSuccessFlag={setIsEmailVerified} // 인증번호 확인  체크여부
              Counting={setIsCounting}
            />
          }
          timer={isCounting ? `${formatTime(timer)}` : undefined}
          required
          error={errors.verificationCode}
        />
      )}

      <InputField
        label="비밀번호"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder="비밀번호"
        type="password"
        required
        error={errors.password}
      />
      <InputField
        label="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
        className="flex justify-between my-2 items-center w-full border border-zinc-300 rounded-lg px-2 py-2 bg-background cursor-pointer
      hover:bg-slate-200"
        onClick={() => setPlanOpen(true)}
      >
        <p className="text-s max-w-[400px]:text-xs mt-[4px]">
          {isPlan || '요금제를 선택해주세요.'}{' '}
        </p>
        <SlArrowRight />
      </div>
      <p className="text-xs md:text-s text-pink-500 mb-2">{errors.isPlan}</p>
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
      <p className="text-xs md:text-s text-pink-500 mb-2">{errors.agreements}</p>

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
