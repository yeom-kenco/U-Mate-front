import Button from './Button';

type ResearchBannerProps = {
  onSurveyClick?: () => void;
};

const ResearchBanner = ({ onSurveyClick }: ResearchBannerProps) => {
  const handleSurveyClick = () => {
    if (onSurveyClick) {
      onSurveyClick();
    }
  };

  return (
    <div className="w-full px-3 py-2">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">📝</span>
            </div>
            <div>
              <h3 className="text-gray-800 text-sm font-semibold mb-1 md:text-m">
                만족도 조사 참여하기
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed md:text-s">
                유식이 챗봇 서비스 개선을 위해 여러분의 소중한 의견이 필요해요
              </p>
            </div>
          </div>

          <Button
            onClick={handleSurveyClick}
            variant="fill"
            className="text-xs px-4 py-2 mt-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex-shrink-0 lg:text-s"
          >
            참여하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResearchBanner;
