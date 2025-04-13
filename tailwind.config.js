/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          lightest: '#B8E3E9',  // scale-1
          light: '#93B1B5',     // scale-2
          medium: '#4F7C82',    // scale-3
          dark: '#0B2E33',      // scale-4
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#4F7C82',
              '&:hover': {
                color: '#0B2E33',
              },
            },
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
          },
        },
      },
    },
  },
  plugins: [],
};