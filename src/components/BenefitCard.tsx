interface BenefitCardProps {
  img?: string;
  title: string;
  descript?: string;
}

const BenefitCard = ({ img, title, descript }: BenefitCardProps) => {
  return (
    <button className="flex flex-col cursor-pointer items-center justify-center w-[110px] max-[400px]:w-[100px] h-[140px] border-2 border-zinc-300 rounded-lg text-center focus:border-pink-500">
      {img && (
        <div className="w-[50px] h-[50px] rounded-full bg-background overflow-hidden flex-shrink-0 ">
          <img src={img} alt={title} className=" w-full h-full object-contain" />
        </div>
      )}
      <div className="flex flex-col items-center mt-2 space-y-[2px]">
        <p className="text-s w-20 font-bold text-zinc-600 leading-tight ">{title}</p>
        <p className="text-s w-16 text-zinc-500  line-clamp-2 leading-tight">{descript}</p>
      </div>
    </button>
  );
};

export default BenefitCard;
