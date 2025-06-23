import BaseModal from './BaseModal';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import AccountStepRenderer from './AccountStepRenderer';
import { findEmailByPhone } from '../../apis/auth';
import { useToast } from '../../hooks/useToast';

type FlowType = 'id' | 'password';
type ModalStep = 'findId' | 'getId' | 'verify' | 'reset';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [findEmail, setFindEmail] = useState('');
  const isValidPhone = /^\d{10,11}$/;
  const { showToast } = useToast();
  const handlefindEmailByPhone = async () => {
    if (!phoneNumber) return;

    if (!isValidPhone.test(phoneNumber)) {
      showToast('휴대폰 번호 형식을 확인해주세요.', 'error');
      return;
    }
    // API 로직 추가하기
    try {
      const res = await findEmailByPhone({ phoneNumber });
      console.log(res.data);
      if (res.data.success === false) {
        showToast('등록된 이메일이 없습니다', 'black');
        return false;
      }
      setFindEmail(res.data.message);
      console.log(findEmail);
      return true;
    } catch (err) {
      console.log(err);
      showToast('오류가 발생했습니다', 'error');
      return false;
    }
  };
  const handleRequestAuth = () => {
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
  const Email = findEmail.split(' : ')[1];
  return (
    <BaseModal onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-lm font-bold max-[400px]:text-m">{title}</h2>
          <button onClick={onClose} aria-label="닫기">
            <IoCloseOutline className="text-2xl text-zinc-400 hover:text-black" />
          </button>
        </div>
        <p className="text-m mt-2 mb-8 max-[400px]:text-s max-[400px]:mb-6">{subtitle}</p>

        <AccountStepRenderer
          step={step}
          flow={flow}
          isCodeSent={isCodeSent}
          onChangeFlow={handleTabChange}
          onRequestAuth={handleRequestAuth}
          handlefindEmailByPhone={handlefindEmailByPhone}
          phoneNumber={phoneNumber}
          Email={Email}
          setPhoneNumber={setPhoneNumber}
          onNext={handleNext}
          onClose={onClose}
        />
      </div>
    </BaseModal>
  );
};

export default FindAccountModal;
