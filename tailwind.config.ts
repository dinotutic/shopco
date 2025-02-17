import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "1060": "1060px",
      },
      colors: {
        primaryBackground: "#FFFFFF",
        primaryText: "#000000",
        secondaryBackground: "#000000",
        secondaryText: "#FFFFFF",
        gray_bg: "#f3f1f2",
      },
      fontFamily: {
        satoshiBlack: ["SatoshiBlack", "Arial", "Helvetica", "sans-serif"],
        satoshiBold: ["SatoshiBold", "Arial", "Helvetica", "sans-serif"],
        satoshiLight: ["SatoshiLight", "Arial", "Helvetica", "sans-serif"],
        satoshiMedium: ["SatoshiMedium", "Arial", "Helvetica", "sans-serif"],
        satoshiRegular: ["SatoshiRegular", "Arial", "Helvetica", "sans-serif"],
        integralCf: ["IntegralCf", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
