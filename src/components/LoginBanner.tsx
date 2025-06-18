import { useNavigate } from 'react-router-dom';
import Button from './Button';

type LoginBannerProps = {
  type: 'default' | 'chatbot';
};

const LoginBanner = ({ type }: LoginBannerProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const message =
    type === 'chatbot'
      ? '로그인하고 현재 가입조건을 이용하세요'
      : '로그인하고 고객님만을 위한 대화를 시작해보세요';

  return (
    <div
      className={`w-full flex justify-between items-center gap-2 px-3 py-3 text-white bg-primary`}
    >
      <span className="text-sm font-normal mt-[2px] max-[400px]:text-xs">{message}</span>
      <Button variant="outline" color="white" onClick={handleLoginClick}>
        로그인
      </Button>
    </div>
  );
};

export default LoginBanner;

// 사용 예시
// <LoginBanner type="default" />
// <LoginBanner type="chatbot" />
