import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-white': '#f3effe',
        'dark-white': '#DFD4FC',
        'dark-gray': '#121212',
        'light-gray': '#222222',
      },
      gridTemplateColumns: {
        home: '6rem minmax(800px, 1fr)',
      },
    },
  },
  plugins: [],
}
export default config
