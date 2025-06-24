import { Link } from 'react-router-dom';
import footerBear from '../assets/footerBear.svg';

const Footer = () => {
  return (
    <div className="bg-zinc-100 px-6 py-5">
      <div className="text-[#737373] text-sm leading-relaxed md:flex md:flex-col md:items-center md:text-m">
        <div className="flex justify-center">
          <img
            src={footerBear}
            alt="푸터곰돌이"
            className="w-[5vw] min-w-[100px] hidden md:block"
          />
        </div>
        <p className="pb-3 mb-3 font-regular border-b border-[#A1A1A1] md:px-24">
          (주)유레카 사업자정보
        </p>
        <p className="mb-1">
          <Link to="/" className="hover:underline hover:text-inherit">
            유메이트(U:Mate)
          </Link>{' '}
          |{' '}
          <Link to="/terms" className="hover:underline hover:text-inherit">
            이용약관
          </Link>
        </p>
        <p className="mb-1">
          <a
            href="https://github.com/khwww"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-inherit"
          >
            김현우
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/nas7062"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-inherit"
          >
            김민석
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/sejinbaek"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-inherit"
          >
            백세진
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/yeom-kenco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-inherit"
          >
            염승아
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/seungwoo505"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-inherit"
          >
            이승우
          </a>
        </p>
        <p className="text-xs mt-2 mb-2 md:text-s">Copyright ⓒ U:Mate. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
