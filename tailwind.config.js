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
        horizontal: 'linear-gradient(180deg, #F3F4F8 0%, #F5EAFA 52%, #E4D9F9 71%)',
        primary: 'linear-gradient(90deg, #BA0087 0%, #33059C 62%)',
      },

      fontSize: {
        // text-[지정명]
        xs: '10px',
        s: '12px',
        sm: '14px',
        m: '16px',
        lm: '18px',
        lg: '24px',
        xl: '32px',
        xxl: '36px',
      },
    },
  },
  plugins: [],
};
