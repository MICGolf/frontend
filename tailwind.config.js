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
        // accent: "#FFD700", // 포인트 색상 (골드)
        // textPrimary: "#333333", // 기본 텍스트 색상 (짙은 회색)
        // textSecondary: "#777777", // 보조 텍스트 색상 (연한 회색)
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
      },
      spacing: {
        "2": "0.5rem", // 8px
        "4": "1rem", // 16px
        "6": "1.5rem", // 24px
        "8": "2rem", // 32px
        "10": "2.5rem", // 40px
      },
      borderRadius: {
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        lg: "0.5rem", // 8px
        full: "9999px", // 완전한 원형
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)", // 작은 그림자
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", // 기본 그림자
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)", // 큰 그림자
      },
    },
  },
  plugins: [],
}

