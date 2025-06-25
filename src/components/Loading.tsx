import { BeatLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <BeatLoader color="#8b5cf6" margin={10} size={15} speedMultiplier={0.7} />
      <p className="text-m mt-4">데이터를 불러오고 있어요...</p>
    </div>
  );
};
