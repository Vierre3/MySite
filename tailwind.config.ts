import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'orange-accent': '#FF6B00',
        'orange-light': '#FF8A33',
        'orange-dark': '#CC5500',
        'orange-glow': 'rgba(255, 107, 0, 0.3)',
        'orange-glow-strong': 'rgba(255, 107, 0, 0.5)',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-hover': 'rgba(255, 255, 255, 0.08)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-border-hover': 'rgba(255, 255, 255, 0.18)',
        'dark-bg': '#0a0a1a',
        'dark-surface': '#111127',
        'dark-card': '#16162e',
        'text-primary': '#f0f0f5',
        'text-secondary': '#a0a0b8',
      },
    },
  },
} satisfies Config
