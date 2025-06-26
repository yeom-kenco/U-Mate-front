import InputField from '../InputField';
import Button from '../Button';
import AccountToggleMenu from './AccountToggleMenu';
import ResetPasswordForm from './ResetPasswordModal';
import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { findEmailByPhone } from '../../apis/auth';
import { CodeCheckButton, EmailSendButton } from '../suffixButtons';
import { formatTime } from '../../utils/formatTimer';
import { useAppSelector } from '../../hooks/reduxHooks';

type Props = {
  step: 'findId' | 'getId' | 'verify' | 'reset';
  flow: 'id' | 'password';
  isCodeSent: boolean;
  onChangeFlow: (type: 'id' | 'password') => void;
  onNext: () => void;
  onClose: () => void;
  setVerificationCodeComplete: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail?: string;
};

const AccountStepContent = ({
  step,
  flow,
  isCodeSent,
  onChangeFlow,
  onNext,
  onClose,
  setVerificationCodeComplete,
  userEmail,
}: Props) => {
  const { showToast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const user = useAppSelector((state) => state.user);
  const [findEmail, setFindEmail] = useState(user?.email || '');
  const isValidPhone = /^\d{10,11}$/;
  const [email, setEmail] = useState('');
  const [isEmailClicked, setIsEmailClicked] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(180);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const Email = findEmail.split(' : ')[1] ?? '';
  const [isSubmmited, setIsSubmmited] = useState<boolean>(false);
  const handlefindEmailByPhone = async () => {
    if (!isValidPhone.test(phoneNumber)) {
      showToast('휴대폰 번호 형식이 유효하지 않습니다', 'error');
      return;
    }
    try {
      const res = await findEmailByPhone({ phoneNumber });
      if (res.data.success === false) {
        showToast('등록된 이메일이 없습니다', 'black');
      } else {
        setFindEmail(res.data.message);
        onNext(); // 성공했을 때만 다음 단계로 이동
      }
    } catch (err) {
      showToast('등록된 이메일이 없습니다', 'black');
    }
    setPhoneNumber('');
  };

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

  useEffect(() => {
    setIsEmailClicked(false);
  }, [email]);

  const isLogin = flow === 'password' && step === 'reset';
  switch (step) {
    case 'findId':
      return (
        <>
          <AccountToggleMenu active={flow} onChange={onChangeFlow} />
          <InputField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="box"
            placeholder="휴대폰 번호 입력 ex) 01012345678"
          />
          <Button
            onClick={handlefindEmailByPhone}
            size="lg"
            fullWidth
            className="mt-4 max-[400px]:text-s"
            disabled={isSubmmited}
          >
            아이디 찾기
          </Button>
        </>
      );

    case 'getId':
      return (
        <>
          <p className="text-sm border border-zinc-200 p-4 rounded-lg">
            등록된 이메일은
            <br /> <strong className="text-pink-500">{Email || 'asd***@naver.com'}</strong> 입니다.
          </p>
          <p className="text-s mt-2 mb-2 max-[400px]:text-xs max-[320px]:text-[9px]">
            비밀번호도 잊으셨나요? 걱정하지 마세요.
            <br /> 아래 버튼을 눌러 비밀번호를 쉽고 빠르게 찾아보실 수 있어요.
          </p>
          <Button onClick={() => onChangeFlow('password')} size="lg" fullWidth className="mt-4">
            비밀번호 찾기
          </Button>
        </>
      );

    case 'verify':
      return (
        <>
          <AccountToggleMenu active={flow} onChange={onChangeFlow} />
          <InputField
            variant="box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력 (예: lguplus@google.com)"
            suffixButton={
              <EmailSendButton
                email={email}
                setSuccessFlag={setIsEmailClicked} // 이메일 인증 클릭 여부
                Timer={setTimer}
                Counting={setIsCounting}
                isLogin={true}
                setIsSubmmited={setIsSubmmited}
                isSubmmited={isSubmmited}
              />
            }
            disabled={isEmailClicked}
          />

          <InputField
            variant="box"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호 6자리 입력"
            suffixButton={
              <CodeCheckButton
                email={email}
                code={verificationCode}
                Counting={setIsCounting}
                setIsSubmmited={setIsSubmmited}
                isSubmmited={isSubmmited}
                setSuccessFlag={(success) => {
                  setVerificationCodeComplete(success);
                  if (success) setFindEmail(email);
                }}
              />
            }
            timer={isCounting ? `${formatTime(timer)}` : undefined}
            required
          />
          {isCodeSent && (
            <p className="text-s mt-2 text-pink-500 leading-4 max-[400px]:text-xs">
              인증번호가 발송되었습니다. 인증번호가 오지 않는다면, 입력하신 이메일이 정확한지
              확인해주세요.
            </p>
          )}
        </>
      );

    case 'reset':
      return (
        <ResetPasswordForm
          onCancel={onClose}
          email={userEmail ?? ''}
          findEmail={email}
          isLogin={!isLogin}
        />
      );

    default:
      return null;
  }
};

export default AccountStepContent;
