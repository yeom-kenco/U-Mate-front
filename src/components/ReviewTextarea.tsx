import { useState, ChangeEvent } from 'react';
import { useToast } from '../hooks/useToast';

// 📌사용법
/*
const TempPage = () => {
  const [review, setReview] = useState('');

  return (
    <div className="py-10">
      <ReviewTextarea maxLength={100} minLength={10} value={review} onChange={setReview} />
    </div>
  );
};
*/

interface ReviewTextareaProps {
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  value?: string;
  width?: string;
  onChange?: (value: string) => void;
}

const ReviewTextarea = ({
  maxLength = 100,
  minLength = 10,
  placeholder = '리뷰를 작성해주세요',
  value = '',
  width,
  onChange,
}: ReviewTextareaProps) => {
  const [text, setText] = useState(value);
  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // maxLength 초과 시 입력 막기 (toast 없이 조용히 무시)
    if (newValue.length > maxLength) return;

    setText(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    // 최소 길이보다 짧으면 토스트 출력
    if (text.length > 0 && text.length < minLength) {
      toast?.showToast(`리뷰는 최소 ${minLength}자 이상 작성해주세요.`, 'error');
    }
  };

  return (
    <div className={`relative bg-[#f5f5f5] p-4 rounded-lg ${width ?? 'w-[95%]'}`}>
      <textarea
        className="w-full h-28 resize-none bg-transparent text-sm text-zinc-800 placeholder-zinc-300 outline-none whitespace-pre-line"
        placeholder={`리뷰를 작성해주세요.\n리뷰는 최소 ${minLength}자 이상부터 작성 가능합니다.`}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="absolute bottom-2 right-4 text-xs text-zinc-400">
        {text.length} / {maxLength}
      </div>
    </div>
  );
};

export default ReviewTextarea;
