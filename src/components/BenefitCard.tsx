const MockData = {};

interface BenefitCardProps {
  img: string;
  title: string;
  descript: string;
}

const BenefitCard = ({ img, title, descript }: BenefitCardProps) => {
  return (
    <div className="flex flex-col  items-center justify-center w-[110px] h-[140px] border-2 border-zinc-300 rounded-lg text-center">
      <div className="w-[50px] h-[50px] rounded-full bg-background overflow-hidden ">
        <img src={img} alt={title} className="w-full h-full object-contain" />
      </div>
      <p className="text-s font-bold text-zinc-600">{title}</p>
      <p className="text-s  text-zinc-500  leading-4 line-clamp-2">{descript}</p>
    </div>
  );
};

export default BenefitCard;
