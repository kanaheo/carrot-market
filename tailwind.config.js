/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // 브라우저 설정을 따라서 ! class를 써주면 dark를 넣어서 수동으로 변경가능함!
  plugins: [require("@tailwindcss/forms")],
};
