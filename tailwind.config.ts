import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    colors: {
      white: "#ffffff",
      "blue-600": "#254EFB",
      "blue-400": "#0079FC",
      "blue-300": "#0C9CF3",
      "blue-200": "#12C1FB",
      "blue-100": "#5FD4FB",

      "yellow-600": "#FFEF16",
      "yellow-400": "#EED811",
      "yellow-300": "#FFF671",
      "yellow-100": "#FFF0BE",

      "orange-700": "#AE6C0A",
      "orange-500": "#867C1D",
      "orange-400": "#B87B11",
      "orange-300": "#DB8323",
      "orange-200": "#D08B11",

      "purple-900": "#1F1D29",
      "purple-500": "#3A085B",

      "gray-300": "#292F32",
      "gray-100": "#9CB4B8",

      warm: "#E1D7D5",
      cool: "#D5D7E1",
      black: "#000000",
      disabled: "#EBEBE4",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
