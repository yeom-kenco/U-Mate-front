import { useState } from 'react';
import { MdPhone, MdContentCopy, MdAccessTime, MdClose } from 'react-icons/md';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerServiceModal({ isOpen, onClose }: CustomerServiceModalProps) {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const phoneNumbers = [
    {
      type: '일반 고객센터',
      number: '1544-0010',
      hours: '평일 오전 9시 – 오후 6시',
    },
    {
      type: '가입문의',
      number: '1644-7009',
      hours: '평일(월~금): 오전 9시 – 오후 7시 (토요일 오후 6시까지)',
    },
  ];

  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <MdPhone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">고객센터 전화번호</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* 전화번호 목록 */}
        <div className="p-6 space-y-4">
          {phoneNumbers.map((service, index) => (
            <div key={index} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{service.type}</h3>
                <button
                  onClick={() => copyToClipboard(service.number)}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                >
                  <MdContentCopy className="w-3 h-3" />
                  {copiedNumber === service.number ? '복사됨!' : '복사'}
                </button>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold text-purple-600">{service.number}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <MdAccessTime className="w-3 h-3 mr-1" />
                {service.hours}
              </div>
            </div>
          ))}
        </div>

        {/* 안내 메시지 */}
        <div className="mx-6 mb-6 p-4 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-700">
            <strong>💡 안내:</strong> 통화료가 부과될 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
