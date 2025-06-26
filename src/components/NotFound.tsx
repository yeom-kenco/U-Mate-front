import { useNavigate } from 'react-router-dom';
import errorBear from '../assets/notFoundBear.svg';
import Button from './Button';

const NotFound = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen px-4">
      <div className="flex justify-center space-x-[-40px] max-[768px]:space-x-[-30px]">
        <h1 className="text-[25vw] text-pink-500 font-bold leading-none max-[768px]:text-[180px] mt-4 max-[350px]:text-[150px]">
          4
        </h1>
        <img
          src={`${errorBear}`}
          alt="404곰돌이"
          className="w-[25vw] h-[25vw] max-[768px]:w-[180px] max-[768px]:h-[180px]  max-[350px]:w-[150px] max-[350px]:h-[150px]"
        />
        <h1 className="text-[25vw] text-pink-500 font-bold leading-none max-[768px]:text-[180px] mt-4 max-[350px]:text-[150px]">
          4
        </h1>
      </div>
      <h1 className="text-[40px] p-0 mb-10 font-bold text-pink-400 max-[768px]:text-[30px] max-[500px]:text-[25px]">
        Page Not Found
      </h1>
      <Button
        variant="outline"
        color="pink"
        size="m"
        rounded="full"
        className="w-[40%] max-w-[180px] py-6 max-[400px]:py-3"
        onClick={goToMain}
      >
        메인으로 이동
      </Button>
    </div>
  );
};

export default NotFound;
