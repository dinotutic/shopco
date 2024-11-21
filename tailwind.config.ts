import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#FFFFFF",
        primaryText: "#000000",
        secondaryBackground: "#000000",
        secondaryText: "#FFFFFF",
      },
      fontFamily: {
        satoshiLight: ["SatoshiLight", "Arial", "Helvetica", "sans-serif"],
        satoshiMedium: ["SatoshiMedium", "Arial", "Helvetica", "sans-serif"],
        satoshiRegular: ["SatoshiRegular", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
