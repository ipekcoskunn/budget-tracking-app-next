import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {

      // },
      container: {
        padding: '2rem',
      },
      colors: {
        primaryColor: "#a11727",
        secondaryColor: "#FFF1DB",
        btnColor: "#b06670",
        btnHoverColor: "#781527",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
