import InputField from '../InputField';
import Button from '../Button';
import AccountToggleMenu from './AccountToggleMenu';
import ResetPasswordForm from './ResetPasswordModal';

type Props = {
  step: 'findId' | 'getId' | 'verify' | 'reset';
  flow: 'id' | 'password';
  isCodeSent: boolean;
  onChangeFlow: (type: 'id' | 'password') => void;
  onRequestAuth: () => void;
  onNext: () => void;
  onClose: () => void;
};

const AccountStepContent = ({
  step,
  flow,
  isCodeSent,
  onChangeFlow,
  onRequestAuth,
  onNext,
  onClose,
}: Props) => {
  switch (step) {
    case 'findId':
      return (
        <>
          <AccountToggleMenu active={flow} onChange={onChangeFlow} />
          <InputField variant="box" placeholder="휴대폰 번호 입력 ex) 01012345678" />
          <Button onClick={onNext} size="lg" fullWidth className="mt-4 max-[400px]:text-s">
            아이디 찾기
          </Button>
        </>
      );

    case 'getId':
      return (
        <>
          <p className="text-sm border border-zinc-200 p-4 rounded-lg">
            당신이 가입한 이메일은
            <br /> <strong className="text-pink-500">sejin@naver.com</strong> 입니다.
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
          <InputField variant="box" placeholder="휴대폰 번호 입력" />
          <Button onClick={onRequestAuth} size="s">
            인증 요청
          </Button>
          <InputField variant="box" placeholder="인증번호 입력" />
          <Button onClick={onNext} size="s">
            확인
          </Button>
          {isCodeSent && (
            <p className="text-s mt-2 text-pink-500 leading-4 max-[400px]:text-xs">
              인증번호가 발송되었습니다. 인증번호가 오지 않는다면, 입력하신 이메일이 정확한지
              확인해주세요.
            </p>
          )}
        </>
      );

    case 'reset':
      return <ResetPasswordForm onCancel={onClose} onComplete={onClose} />;

    default:
      return null;
  }
};

export default AccountStepContent;
