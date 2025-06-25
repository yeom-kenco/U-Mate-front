import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // bg-[지정명]
        background: '#F6F7FB',
      },
      backgroundImage: {
        // bg-[지정명]
        chatbot: 'linear-gradient(180deg, #FFABC4 0%, #F254A3 45%, #6B12F5 100%)',
        diagonal: 'linear-gradient(135deg, #F3F4F8 0%, #F5EAFA 38%, #E4D9F9 87%)',
        rdiagonal: 'linear-gradient(320deg, #F3F4F8 0%, #F5EAFA 38%, #E4D9F9 100%)',
        horizontal: 'linear-gradient(180deg, #F3F4F8 0%, #F5EAFA 52%, #E4D9F9 71%)',
        primary: 'linear-gradient(90deg, #BA0087 0%, #33059C 62%)',
      },

      boxShadow: {
        // shadow-[지정명]
        card: '0px 0px 15px rgba(0, 0, 0, 0.15)',
        header: '0px 2px 4px rgba(0,0,0,0.15)',
        lilac: '0px 2px 26px 0px #E3CDFF',
      },

      fontSize: {
        // text-[지정명]
        xs: '0.625rem', // 10px
        s: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        m: '1rem', // 기본값(16px)
        lm: '1.125rem', // 18px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        xxl: '2.25rem', //36px
      },
      screens: {
        xs: '400px', // 400px 이상
      },
    },
    plugins: [scrollbarHide],
  },
};
