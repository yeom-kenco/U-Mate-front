import { BeatLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-10">
      <BeatLoader color="#8b5cf6" margin={10} size={15} speedMultiplier={0.7} />
      <p className="text-m">데이터를 불러오고 있어요...</p>
    </div>
  );
};
