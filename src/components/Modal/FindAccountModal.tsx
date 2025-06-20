import BaseModal from './BaseModal';
import Button from '../Button';
import { useState } from 'react';
import InputField from '../InputField';
import { IoCloseOutline } from 'react-icons/io5';
import AccountToggleMenu from './AccountToggleMenu';

type FlowType = 'id' | 'password'; // 아이디, 비밀번호 구분
type ModalStep = 'findId' | 'getId' | 'verify' | 'reset'; // 현재 단계 구분

type Props = {
  onClose: () => void;
};

const titleMap: Record<ModalStep, { title: string; subtitle?: string }> = {
  findId: {
    title: '아이디 / 비밀번호 찾기',
    subtitle: '어떤 이메일로 가입했는지 알려드릴게요 😊',
  },
  getId: {
    title: '아이디 / 비밀번호 찾기',
    subtitle: '가입된 이메일 정보를 알려드려요 😊',
  },
  verify: {
    title: '본인 인증',
    subtitle: '본인 확인 후, 비밀번호를 재설정하세요 😊',
  },
  reset: {
    title: '비밀번호 재설정',
    subtitle: '새로운 비밀번호를 입력해주세요  😊',
  },
};

const FindAccountModal = ({ onClose }: Props) => {
  const [flow, setFlow] = useState<FlowType>('id');
  const [step, setStep] = useState<ModalStep>('findId');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestAuth = () => {
    // 실제 API 요청
    console.log('인증 요청됨');
    setIsCodeSent(true);
  };

  const handleNext = () => {
    switch (step) {
      case 'findId':
        setStep('getId');
        break;
      case 'getId':
        setFlow('password');
        setStep('verify');
        break;
      case 'verify':
        if (isCodeSent) {
          setStep('reset');
        }
        break;
      case 'reset':
        setIsCodeSent(false);
        onClose();
        break;
    }
  };

  const handleTabChange = (type: FlowType) => {
    setFlow(type);
    setStep(type === 'id' ? 'findId' : 'verify');
    setIsCodeSent(false);
  };

  const { title, subtitle } = titleMap[step];

  return (
    <BaseModal onClose={onClose}>
      <div className="p-6">
        {/* 닫기 버튼 */}
        <div className="flex justify-between">
          {/* 제목 */}
          <h2 className={'text-lm font-bold max-[400px]:text-m'}>{title}</h2>
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>
        <p className="text-m mt-2 mb-8 max-[400px]:text-s max-[400px]:mb-6">{subtitle}</p>

        {/* 아이디 찾기 흐름 */}
        {flow === 'id' && step === 'findId' && (
          <>
            <AccountToggleMenu active={flow} onChange={handleTabChange} />
            <InputField variant="box" placeholder="휴대폰 번호 입력 ex) 01012345678" />
            <Button onClick={handleNext} size="lg" fullWidth className="mt-4 max-[400px]:text-s">
              아이디 찾기
            </Button>
          </>
        )}
        {flow === 'id' && step === 'getId' && (
          <>
            <p className="text-sm border border-zinc-200 p-3 mt-2 rounded-md">
              당신이 가입한 이메일은
              <br /> <strong>sejin@naver.com</strong> 입니다.
            </p>
            <p className="text-s mt-3 mb-2 max-[400px]:text-xs max-[320px]:text-[9px]">
              비밀번호도 잊으셨나요? 걱정하지 마세요.
              <br /> 아래 버튼을 눌러 비밀번호를 쉽고 빠르게 찾아보실 수 있어요.
            </p>
            <Button
              onClick={() => handleTabChange('password')}
              size="lg"
              fullWidth
              className="mt-4"
            >
              비밀번호 찾기
            </Button>
          </>
        )}
        {/* 본인인증 */}
        {flow === 'password' && step === 'verify' && (
          <>
            <AccountToggleMenu active={flow} onChange={handleTabChange} />
            <InputField variant="box" placeholder="휴대폰 번호 입력" />
            <Button onClick={handleRequestAuth} size="s">
              인증 요청
            </Button>
            <InputField variant="box" placeholder="인증번호 입력" />
            <Button onClick={handleNext} size="s">
              확인
            </Button>
            {isCodeSent && (
              <p className="text-s mt-2 text-pink-500 leading-4 max-[400px]:text-xs">
                인증번호가 발송되었습니다. 인증번호가 오지 않는다면, 입력하신 이메일이 정확한 지
                확인해주세요.
              </p>
            )}
          </>
        )}

        {/* 비밀번호 재설정 */}
        {flow === 'password' && step === 'reset' && (
          <>
            <InputField variant="box" placeholder="새 비밀번호 입력" type="password" />
            <InputField variant="box" placeholder="비밀번호 확인" type="password" />
            <div className="flex gap-2 mt-4">
              <Button variant="fill" color="gray" size="lg" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button variant="fill" size="lg" onClick={onClose} className="flex-1">
                완료
              </Button>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default FindAccountModal;
