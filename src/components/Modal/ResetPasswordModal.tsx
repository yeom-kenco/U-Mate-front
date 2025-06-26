import InputField from '../InputField';
import Button from '../Button';
import { useState } from 'react';
import { changePassword, resetPassword } from '../../apis/auth';
import { useToast } from '../../hooks/useToast';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  onCancel: () => void;
  email: string;
  isLogin?: boolean;
  findEmail?: string;
};

const ResetPasswordForm = ({ onCancel, email, isLogin = false, findEmail }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 비밀번호 재설정에서
    if (!isLogin) {
      if (!isValidPassword.test(newPassword)) {
        newErrors.newPassword =
          '새 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함하여 12자 이상 입력해주세요.';
      }
      if (newPassword !== newPasswordConfirm) {
        newErrors.newPasswordConfirm = '새 비밀번호가 일치하지 않습니다.';
      }
    } else {
      if (!isValidPassword.test(password)) {
        newErrors.password =
          '현재 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함하여 12자 이상입니다.';
      }

      if (password === newPassword) {
        newErrors.newPassword = '현재 비밀번호를 새 비밀번호로 할 수 없습니다.';
      }

      if (!isValidPassword.test(newPassword)) {
        newErrors.newPassword =
          '새 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함하여 12자 이상 입력해주세요.';
      }

      if (newPassword !== newPasswordConfirm) {
        newErrors.newPasswordConfirm = '새 비밀번호가 일치하지 않습니다.';
      }
    }

    setErrors(newErrors);
    // 하나도 없어야 통과
    return Object.values(newErrors).every((e) => e === '');
  };
  const handlePasswordReset = async () => {
    if (!validate()) return;
    try {
      // 비밀번호 재설정에서
      console.log(email, newPassword);
      if (!isLogin) {
        const res = await resetPassword({ email: findEmail, password: newPassword });
        showToast(res.data.message, 'success');
      } else {
        const res = await changePassword({ email, password, newPassword });
        dispatch(clearUser());
        navigate('/login');
        showToast(res.data.message, 'success');
      }
      onCancel();
    } catch (err: any) {
      console.log(err);
      if (err.status === 404) {
        showToast(err.response.data.error, 'error');
      } else showToast('비밀번호 변경 실패', 'error');
    }
  };
  console.log(isLogin);
  return (
    <>
      <div className="max-h-32 flex flex-col justify-between flex-1">
        {!isLogin ? (
          ''
        ) : (
          <InputField
            variant="box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호 입력"
            type="password"
            error={errors.password}
          />
        )}

        <InputField
          variant="box"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호 입력"
          type="password"
          error={errors.newPassword}
        />
        <InputField
          variant="box"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          placeholder="새 비밀번호 확인"
          type="password"
          error={errors.newPasswordConfirm}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="fill" color="gray" size="lg" onClick={onCancel} className="flex-1">
          취소
        </Button>
        <Button variant="fill" size="lg" onClick={handlePasswordReset} className="flex-1">
          완료
        </Button>
      </div>
    </>
  );
};

export default ResetPasswordForm;
