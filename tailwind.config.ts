import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        surface: 'rgba(255,255,255,0.6)',
        accent: '#B5651D',
        accentSoft: '#E6C09C',
        ink: '#111111',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;