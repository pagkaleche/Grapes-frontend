/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      backdropBlur: {
        'none': 'none',
        'sm': 'blur(4px)',
        'md': 'blur(8px)',
        'lg': 'blur(16px)',
        'xl': 'blur(24px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};