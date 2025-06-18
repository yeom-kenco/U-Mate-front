type LoginBannerProps = {
  message: string;
  onClick: () => void;
};

const LoginBanner = ({ message, onClick }: LoginBannerProps) => {
  return (
    <div
      className={`w-full flex justify-between items-center gap-2 px-2 py-3 text-white bg-primary`}
    >
      <span className="text-s font-normal mt-[2px]">{message}</span>
      <button
        onClick={onClick}
        className="text-s border font-normal whitespace-nowrap border-white text-white w-fit px-2 py-1 rounded-lg"
      >
        <span className="mt-[2px] inline-block">로그인</span>
      </button>
    </div>
  );
};

export default LoginBanner;
