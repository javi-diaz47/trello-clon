import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontSize: {
    //   sm: ['0.625rem', { lineHeight: '7.5rem' }],
    //   base: ['0.875rem', { lineHeight: '7.5rem' }],
    //   xl: ['1.125rem', { lineHeight: '7.5rem' }],
    //   '2xl': ['1.5rem', { lineHeight: '7.5rem' }],
    //   '3xl': ['3.563rem', { lineHeight: '7.5rem' }],
    //   '4xl': ['4.75rem', { lineHeight: '7.5rem' }],
    //   '5xl': ['6.313rem', { lineHeight: '7.5rem' }],
    // },
    extend: {
      colors: {
        'light-white': '#f3effe',
        'dark-white': '#DFD4FC',
        'dark-gray': '#121212',
        'light-gray': '#222222',
      },
    },
  },
  plugins: [],
}
export default config
