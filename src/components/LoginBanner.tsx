import { useNavigate } from 'react-router-dom';
import Button from './Button';

type LoginBannerProps = {
  type: 'default' | 'chatbot' | 'mainWhite' | 'mainGradient';
};

const LoginBanner = ({ type }: LoginBannerProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');

  const messages: Record<LoginBannerProps['type'], React.ReactNode> = {
    default: <span>로그인하고 현재 가입조건을 이용하세요</span>,
    chatbot: <span>로그인하고 고객님만을 위한 대화를 시작해보세요</span>,
    mainWhite: (
      <>
        고객님, 가입하시고 유플러스만의
        <br /> <span className="text-pink-500">멤버십 혜택!</span> 놓치지마세요 😀
      </>
    ),
    mainGradient: (
      <>
        로그인 후, 나에게 맞는 요금제와
        <br /> 혜택을 더 자세히 확인할 수 있어요
      </>
    ),
  };

  const isMainWhite = type === 'mainWhite';

  const containerClass = isMainWhite
    ? 'bg-white text-black rounded-2xl border border-zinc-200 drop-shadow-[0_0px_12px_rgba(0,0,0,0.08)] px-5 py-9 max-[400px]:py-6'
    : type === 'mainGradient'
      ? 'bg-primary text-white rounded-2xl px-5 py-9 max-[400px]:py-6'
      : 'bg-primary text-white';

  const buttonVariant = 'outline' as const;
  const buttonColor = isMainWhite ? ('gray' as const) : ('white' as const);

  return (
    <div className={`w-full flex justify-between items-center gap-2 px-3 py-3 ${containerClass}`}>
      <span className="text-sm font-normal mt-[2px] max-[400px]:text-xs">{messages[type]}</span>
      <Button onClick={handleLoginClick} variant={buttonVariant} color={buttonColor}>
        로그인
      </Button>
    </div>
  );
};

export default LoginBanner;

// 사용 예시
// <LoginBanner type="default" />
// <LoginBanner type="chatbot" />
// <LoginBanner type="mainGradient" />
// <LoginBanner type="mainWhite" />
