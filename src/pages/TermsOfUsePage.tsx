import { termsData } from '../data/terms';

const TermsOfUsePage = () => {
  return (
    <div className="px-4 sm:px-10">
      <h1 className="text-lg font-bold mt-8 sm:text-4xl sm:mt-20">
        <span className="text-pink-500">유</span>메이트 {termsData.title}
      </h1>
      <h2 className="text-m mt-3 sm:mt-5 sm:text-lm p-5 bg-diagonal rounded-lg">
        {termsData.introduction}
      </h2>
      <div className="mt-4 mb-16 p-5 border border-zinc-200 rounded-xl">
        {termsData.sections.map((section, i) => (
          <div key={i} className="py-4">
            <h3 className="font-semibold text-lm mb-3">{section.title}</h3>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((content, idx) => (
                  <li key={idx} className="text-sm sm:text-m">
                    {content}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm sm:text-m">{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfUsePage;
