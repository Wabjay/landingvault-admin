import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scale: {
        "175": "1.75",
      },
      flexBasis: {
        big: "280px",
        large: "504px",
      },
      gridTemplateColumns: {
        big: "1fr 280px",
        large: "1fr 504px",
        auto: "auto 1fr",
      },
      boxShadow: {
        navbarLink:
          "0px 0.5px 0px 0px rgba(3, 7, 18, 0.16), 0px 0.25px 0px 0px rgba(3, 7, 18, 0.16), 0px 1.75px 0px 0px rgba(255, 255, 255, 0.16) inset",
        backButton:
          "0px 0.5px 0px 0px rgba(3, 7, 18, 0.16), 0px 0.25px 0px 0px rgba(3, 7, 18, 0.16), 0px 1.75px 0px 0px rgba(255, 255, 255, 0.16) inset",
        "metric-card": "34.854px 29.626px 48.34px 0px rgba(51, 102, 255, 0.05)",
        "table-shadow":
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        "table-button": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "white-shadow":
          "0px 0.5px 0px 0px rgba(3, 7, 18, 0.16), 0px 0.25px 0px 0px rgba(3, 7, 18, 0.16)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "green-tick": "url('/src/assets/green_tick.png')",
        "white-tick": "url('/src/assets/white_tick.png')",
        overlay:
          "var(--Overlay-color, linear-gradient(180deg, rgba(1, 26, 39, 0.28) 4.69%, rgba(1, 26, 39, 0.25) 56.25%, rgba(1, 26, 39, 0.37) 100%))",
        "white-button":
          "var(linear-gradient(180deg, rgba(0, 12, 20, 0.00) 3.13%, rgba(0, 12, 20, 0.03) 96.87%), #FFF)",
      },
    },
    colors: {
      'blue': {
        10: "#F5FAFF",
        200: "#0A69DB",
        300: "#338FFF",
        400: "#0275FF",
        500: "#0065E0",
        900: "#001229",
        'Bg': 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.00) 100%), #0A69DB)',
        
      },
      'grey': {
        10: "#F9F9F9",
        50: "#EDEDED",
        100: "#D7D7D7",
        200: "#BFBFBF",
        500: "#757575",
        600: "#636363",
        700: "#484848",
        800: "#2D2D2D",
        900: "#1C1C1C",
      },
      'myGreen-400': "#21AB68",
      'green-500': "#3E7B52",
      'green-400': '#21AB68',
      'error': '#E03C00',
      'borderDefault': '#E8E8EA',
      'alabaster': '#F8F8F1',
      'borderBgHover': '#F9F9F9',
      'disabledButton': 'linear-gradient(180deg, rgba(0, 12, 20, 0.00) 3.13%, rgba(0, 12, 20, 0.03) 96.87%), var(--white, #FFF)'
    },
    fontSize: {
      "12": [
        "12px",
        {
          lineHeight: "16px",
        },
      ],
      "14": [
        "14px",
        {
          lineHeight: "18px",
        },
      ],
      "16": [
        "16px",
        {
          lineHeight: "22px",
        },
      ],
      "20": [
        "20px",
        {
          lineHeight: "28px",
          letterSpacing: "-0.8px",
        },
      ],
      "24": [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "-0.96px",
        },
      ],
      "32": [
        "32px",
        {
          lineHeight: "39px",
          letterSpacing: "-1px",
        },
      ],
      "40": [
        "40px",
        {
          lineHeight: "normal",
          letterSpacing: "-0.8px",
        },
      ],
      "48": [
        "48px",
        {
          lineHeight: "57.6px",
          letterSpacing: "-1px",
        },
      ],
    },
    screens: {
      tablet: "576px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
export default config;
