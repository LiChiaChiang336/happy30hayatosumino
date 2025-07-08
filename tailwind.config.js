/** @type {import('tailwindcss').Config} */

// 如果未來還是要用 Hero UI，heroui 可以留著
import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"EB Garamond"', '"Noto Serif TC"', "serif"], // 預設字體
        cn: ['"Noto Serif TC"', "serif"],                     // 中文專用（可選）
        en: ['"EB Garamond"', "serif"],                       // 英文專用（可選）
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      // 可選擇是否擴充顏色（這裡先保留原專案沒有動）
      colors: {
        zinc: {
          DEFAULT: "#D9D9D9",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      layout: {
        fontSize: {
          small: "12px",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#000000",
            primary: {
              DEFAULT: "#3B4163",
            },
            secondary: {
              DEFAULT: "#E3C8B9",
            },
            danger: {
              DEFAULT: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#000000",
            },
          },
        },
      },
    }),
  ],
};
