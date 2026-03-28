/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orb: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        g: '#00e5a0',
        c: '#00f0ff',
        g2: '#00ff88',
        c2: '#7df9ff',
        bg: '#050505',
        bg2: '#08100e',
        bg3: '#0c1614',
        bg4: '#111f1c',
        text: '#d0ece6',
        muted: '#3d6b60',
        muted2: '#1e3d35',
      },
      animation: {
        'pulse-d': 'pulse-d 2s infinite',
        blink: 'blink 0.9s step-end infinite',
        'float-t': 'float-t 7s ease-in-out infinite',
        'float-b': 'float-b 5s ease-in-out 0.7s infinite',
        'border-spin': 'border-spin 2.8s linear infinite',
        shine: 'shine 0.75s ease forwards',
      },
      keyframes: {
        'pulse-d': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,240,255,0.5)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0,240,255,0)' },
        },
        blink: { '50%': { opacity: '0' } },
        'float-t': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.25deg)' },
        },
        'float-b': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        shine: {
          to: { left: '150%' },
        },
      },
    },
  },
  plugins: [],
}
