import { Link } from 'react-router-dom';

const commonTextStyle = 'hover:underline hover:text-inherit px-2';

const Footer = () => {
  return (
    <div className="bg-zinc-100 px-6 py-5">
      <div className="text-[#737373] text-s leading-relaxed sm:flex sm:flex-col sm:items-center">
        <p className="py-3 my-3 font-regular border-b border-[#A1A1A1] sm:px-24 md:px-72">
          (주)유레카 사업자정보
        </p>
        <p className="mb-1">
          <Link to="/" className={`${commonTextStyle} border-r-2 border-zinc-400 pl-0`}>
            유메이트(U:Mate)
          </Link>
          <Link to="/terms" className={commonTextStyle}>
            이용약관
          </Link>
        </p>
        <p className="mb-1">
          <a
            href="https://github.com/khwww"
            target="_blank"
            rel="noopener noreferrer"
            className={`${commonTextStyle} border-r-2 border-zinc-400 pl-0`}
          >
            김현우
          </a>
          <a
            href="https://github.com/nas7062"
            target="_blank"
            rel="noopener noreferrer"
            className={`${commonTextStyle} border-r-2 border-zinc-400`}
          >
            김민석
          </a>
          <a
            href="https://github.com/sejinbaek"
            target="_blank"
            rel="noopener noreferrer"
            className={`${commonTextStyle} border-r-2 border-zinc-400`}
          >
            백세진
          </a>
          <a
            href="https://github.com/yeom-kenco"
            target="_blank"
            rel="noopener noreferrer"
            className={`${commonTextStyle} border-r-2 border-zinc-400`}
          >
            염승아
          </a>
          <a
            href="https://github.com/seungwoo505"
            target="_blank"
            rel="noopener noreferrer"
            className={commonTextStyle}
          >
            이승우
          </a>
        </p>
        <p className="text-xs mt-2 mb-2 sm:text-s sm:mt-4">
          Copyright ⓒ U:Mate. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
