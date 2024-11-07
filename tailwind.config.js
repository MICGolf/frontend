/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000", // 메인 브랜드 색상
        secondary: "#fff", // 배경에 사용하는 중립 색상

        gray100: "#F1F1F1",
        gray300: "#CBCAC7",
        gray500: "#B2B2B2",
        gray700: "#7F7F7F"
      },
    },
  },
  plugins: [],
}

