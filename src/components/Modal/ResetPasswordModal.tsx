import InputField from '../InputField';
import Button from '../Button';
import { useState } from 'react';
import { changePassword } from '../../apis/auth';
import { useToast } from '../../hooks/useToast';

type Props = {
  onCancel: () => void;
  email: string;
};

const ResetPasswordForm = ({ onCancel, email }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const { showToast } = useToast();
  const handlePasswordReset = async () => {
    console.log(email, password, newPassword);
    try {
      const res = await changePassword({ email, password, newPassword });
      showToast(res.data.message, 'success');
      onCancel();
    } catch (err) {
      console.log(err);
      showToast('비밀번호 변경 실패', 'error');
    }
  };
  console.log(email, password, newPassword);
  return (
    <>
      <InputField
        variant="box"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="현재 비밀번호 입력"
        type="password"
      />
      <InputField
        variant="box"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호 입력"
        type="password"
      />
      <InputField
        variant="box"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
        placeholder="새 비밀번호 확인"
        type="password"
      />
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
