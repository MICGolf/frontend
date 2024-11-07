/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000", // 메인 브랜드 색상
        secondary: "#ffffff", // 배경에 사용하는 중립 색상
        accent: "##F77830", // 포인트 색상
        text: "#000000", // 기본 텍스트 색상 (짙은 회색)
        textSub: "#7F7F7F", // 보조 텍스트 색상 (연한 회색)
        textLink: '#0000FF', // 링크
        textGray: '#C7C7C7',
        success: '#008541',
        error: '#FF6E66',
        border: '#D9D9D9',
        borderGray: '#7F7F7F',
        boxGray: '#F6F6F6',
        boxDarkGray: '#3C3C3C',
      },
      fontFamily: {
        sans: ["Noto Sans KR", "Arial", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
} 

