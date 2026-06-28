/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          cyan:   '#06b6d4',
          purple: '#a855f7',
          pink:   '#ec4899',
          gold:   '#f59e0b',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          800: '#0f1117',
          900: '#080b10',
          950: '#050709',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'pulse-slow':     'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':        'shimmer 2s linear infinite',
        'gradient-x':    'gradient-x 3s ease infinite',
        'spin-slow':      'spin 8s linear infinite',
        'bounce-slow':    'bounce 3s infinite',
        'glow':           'glow 2s ease-in-out infinite alternate',
        'slide-up':       'slideUp 0.6s ease-out forwards',
        'fade-in':        'fadeIn 0.8s ease-out forwards',
        'text-flicker':   'textFlicker 0.1s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 40px #6366f1' },
          to:   { boxShadow: '0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #a855f7' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        textFlicker: {
          '0%':   { opacity: '0.9' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(99,102,241,0.4)',
        'glow-purple':  '0 0 20px rgba(168,85,247,0.4)',
        'glow-cyan':    '0 0 20px rgba(6,182,212,0.4)',
        'glass':        '0 8px 32px rgba(0,0,0,0.3)',
        'card-hover':   '0 20px 60px rgba(99,102,241,0.2)',
      },
    },
  },
  plugins: [],
}
