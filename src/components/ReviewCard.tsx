import { AiFillStar } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

// ✅ props 타입 정의
interface ReviewCardProps {
  isMyPage?: boolean;
  writerName?: string;
  writerAge?: string;
  planName?: string;
  content: string;
  date: string;
  rating: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReviewCard = ({
  isMyPage = false,
  writerName,
  writerAge,
  planName,
  content,
  date,
  rating,
  onEdit,
  onDelete,
}: ReviewCardProps) => {
  return (
    <div className="rounded-[20px] bg-white shadow-card overflow-hidden w-[332px] h-[197px] flex flex-col">
      {/* 상단 */}
      <div className="bg-primary text-white px-5 py-3 flex justify-between items-center text-m font-bold">
        {isMyPage ? (
          <span>{planName}</span>
        ) : (
          <>
            <span>
              {writerName?.slice(0, 1)} * {writerName?.slice(-1)}
            </span>
            <span>{writerAge}</span>
          </>
        )}
      </div>

      {/* 내용 */}
      <div className="pl-5 pr-5 pt-3 pb-1 text-gray-700 text-s relative flex-1 flex items-center">
        <div className="w-full">
          <img src="/images/double-quotes.png" className="text-violet-300 text-m mb-2" />
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>

      {/* 하단 */}
      <div className="px-5 pt-1 pb-2">
        <div className="h-[0.5px] bg-zinc-200 mb-2" />
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span className="!font-light">{date}</span>
          <div className="flex items-center gap-1">
            {isMyPage && (
              <>
                <button onClick={onEdit}>
                  <FiEdit className="text-violet-300 text-lm mr-2" />
                </button>
                <button onClick={onDelete}>
                  <FiTrash2 className="text-violet-300 text-lm mr-2" />
                </button>
              </>
            )}
            <AiFillStar className="text-yellow-400 text-sm" />
            <span className="font-normal text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
