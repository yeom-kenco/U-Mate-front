// features/register/AuthButtons.tsx
import React, { useContext } from 'react';
import {
  checkEmailDuplicate,
  checkPhoneDuplicate,
  sendEmailCode,
  verifyEmailCode,
} from '../apis/auth';
import { ToastContext } from '../context/ToastContext';

interface Props {
  email?: string;
  phoneNumber?: string;
  code?: string;
  setError?: (field: string, message: string) => void;
  setSuccessFlag?: (flag: boolean) => void;
  Timer?: React.Dispatch<React.SetStateAction<number>>; //카운트 (180초)
  Counting?: React.Dispatch<React.SetStateAction<boolean>>; //카운트 실행 여부
  isEmailDuplicate?: boolean;
  isPhoneChecked: boolean;
  setIsEMailDuplicate?: React.Dispatch<React.SetStateAction<boolean>>; // 이메일 중복 확인 여부
  isLogin?: boolean;
}

export const PhoneCheckButton = ({
  phoneNumber,
  setError,
  setSuccessFlag,
  isPhoneChecked,
}: Props) => {
  const toastContext = useContext(ToastContext);
  return (
    <span
      onClick={async () => {
        if (!phoneNumber || !/^\d{10,11}$/.test(phoneNumber)) {
          setError('phone', '휴대폰 번호를 정확히 입력해주세요.');
          return;
        }
        try {
          const res = await checkPhoneDuplicate({ phoneNumber });
          toastContext?.showToast(res.data.message, 'success');
          setSuccessFlag?.(true);
        } catch (err: any) {
          toastContext?.showToast('이미 가입된 휴대폰 번호입니다.', 'error');
          setSuccessFlag?.(false);
        }
      }}
    >
      중복 확인
    </span>
  );
};
export const EmailSendButton = ({
  email,
  setError,
  setSuccessFlag,
  Timer,
  Counting,
  isEmailDuplicate,
  setIsEMailDuplicate,
  isLogin,
}: Props) => {
  const toastContext = useContext(ToastContext);

  return (
    <span
      onClick={async () => {
        if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          setError?.('email', '이메일 형식이 올바르지 않습니다.');
          return;
        }

        try {
          // 회원가입 페이지 에서만 중복 확인 재설정에선 X 
          if (!isLogin) {
            const dupRes = await checkEmailDuplicate({ email });

            if (dupRes.status === 404) {
              setIsEMailDuplicate?.(true);
              return; // 중복 확인 실패 → 가입 불가
            } else {
              setIsEMailDuplicate?.(false);
              toastContext?.showToast(dupRes.data.message, 'success');
            }
          }

          // 중복이 아니거나 로그인 상태라면 인증 메일 발송
          const res = await sendEmailCode({ email });
          Timer?.(180);
          Counting?.(true);
          toastContext?.showToast(res.data.message, 'success');
          setSuccessFlag?.(true);
        } catch (err: any) {
          console.error('이메일 인증코드 발송 에러:', err);
          toastContext?.showToast('이미 가입된 이메일이 존재합니다.', 'error');
          setSuccessFlag?.(false);
        }
      }}
    >
      이메일 인증
    </span>
  );
};

export const CodeCheckButton = ({ email, code, setError, setSuccessFlag, Counting }: Props) => {
  const toastContext = useContext(ToastContext);
  return (
    <span
      onClick={async () => {
        if (!email || !code || code.length !== 6) {
          setError?.('code', '인증코드가 올바르지 않습니다.');
          return;
        }
        if (!Counting) {
          setError?.('code', '인증 시간이 만료되었습니다. 다시 요청해주세요.');
        }
        try {
          const res = await verifyEmailCode({ email, auth: code });
          toastContext?.showToast(res.data.message, 'success');
          setSuccessFlag?.(true);
          Counting?.(false);
        } catch (err: any) {
          console.log(err);
          toastContext?.showToast(err.response?.data?.message || '인증 코드 실패', 'error');
          setSuccessFlag?.(false);
        }
      }}
    >
      인증 확인
    </span>
  );
};
