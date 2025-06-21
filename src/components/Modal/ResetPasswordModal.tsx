import InputField from '../InputField';
import Button from '../Button';

type Props = {
  onCancel: () => void;
  onComplete: () => void;
};

const ResetPasswordForm = ({ onCancel, onComplete }: Props) => {
  return (
    <>
      <InputField variant="box" placeholder="새 비밀번호 입력" type="password" />
      <InputField variant="box" placeholder="비밀번호 확인" type="password" />
      <div className="flex gap-2 mt-4">
        <Button variant="fill" color="gray" size="lg" onClick={onCancel} className="flex-1">
          취소
        </Button>
        <Button variant="fill" size="lg" onClick={onComplete} className="flex-1">
          완료
        </Button>
      </div>
    </>
  );
};

export default ResetPasswordForm;
