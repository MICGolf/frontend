/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      boxShadow: {
        'top': '0 0 10px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: "#000000", // 메인 브랜드 색상
        secondary: "#ffffff", // 배경에 사용하는 중립 색상
        accent: "#F77830", // 포인트 색상
        gray100: "#F1F1F1",
        gray200: "#C5C5C5",
        gray300: "#CBCAC7",
        gray400: "#C7C7C7",
        gray500: "#B2B2B2",
        gray700: "#7F7F7F",
        blue700: "#0000FF", // 링크
        success: "#008541",
        error: '#FF0E00',
        naver: '#00DE5A',
        transparentBlack: 'rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        sans: ["Noto Sans KR", "Arial", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
    corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 

