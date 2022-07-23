/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "F9FBFF",
        inputBox: "F0F5FF",
        shadow: "#D8E1F3",
        modalColor: "#FAFBFF",
        modalShadow: "#F0F5FF8C",
        button: "#3E6BC1",
        plainBlack: "#1F2023",
        textColor: "#454B56",
        ibGuide: "#868C95",
      },
      fontSize: {
        h1: "3rem",
        h2: "2.25rem",
        sp: "1.75rem",
        h3: "1.5rem",
        h4: "1.25rem",
        p: "1.125rem",
      },
      fontFamily: {
        roboto: "Roboto",
        montserrat: "Montserrat",
      },
    },
  },
  plugins: [],
};
