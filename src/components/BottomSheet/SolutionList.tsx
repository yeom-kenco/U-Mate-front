interface PlanListProps {
  onSelect: (value: string) => void;
  selected: string;
  onSendMessage?: (message: string) => void; // 일단 옵션으로 (챗봇에게 보내기(상위 컴포넌트로 ))
}

const solutions = [
  '맞춤 요금제 찾기',
  '챗봇 유세이 알아보기',
  '해외 로밍 설정 안내',
  '위약금 정책 안내',
  '내 멤버십 확인',
  '이번달 예상 요금',
  '진행중인 이벤트',
  '요금제 리뷰 살펴보기',
  '실제 상담원 연결하기',
]; // 예시 확장

const SolutionList: React.FC<PlanListProps> = ({ onSelect, selected, onSendMessage }) => {
  return (
    <ul className="flex flex-wrap px-3 py-2 gap-2 ">
      <p className="font-bold text-lg mb-4 w-full">원하는 질문을 찾아보세요</p>
      {solutions.map((text, index) => (
        <li
          key={index}
          className="pt-2 pb-[5px] px-4 border border-zinc-200 rounded-3xl cursor-pointer text-sm text-gray-700 hover:text-pink-500"
          onClick={() => {
            onSelect(text);
            //onSendMessage(text); // 챗봇에게 메시지 전송
          }}
        >
          {text}
        </li>
      ))}
    </ul>
  );
};

export default SolutionList;
