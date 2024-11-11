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
        accent: "#F77830", // 포인트 색상
        gray100: "#F1F1F1",
        gray200: "#C5C5C5",
        gray300: "#CBCAC7",
        gray500: "#B2B2B2",
        gray700: "#7F7F7F",
        blue700: "#0000FF", // 링크
        success: "#008541",
        error: '#FF0E00',
      },
      fontFamily: {
        sans: ["Noto Sans KR", "Arial", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
} 

