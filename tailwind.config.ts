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
        'orange-accent': 'rgb(var(--orange-accent) / <alpha-value>)',
        'orange-light': 'rgb(var(--orange-light) / <alpha-value>)',
        'orange-dark': 'rgb(var(--orange-dark) / <alpha-value>)',
        'orange-glow': 'var(--orange-glow)',
        'orange-glow-strong': 'var(--orange-glow-strong)',
        'glass': 'var(--glass)',
        'glass-hover': 'var(--glass-hover)',
        'glass-border': 'var(--glass-border)',
        'glass-border-hover': 'var(--glass-border-hover)',
        'dark-bg': 'rgb(var(--dark-bg) / <alpha-value>)',
        'dark-surface': 'rgb(var(--dark-surface) / <alpha-value>)',
        'dark-card': 'rgb(var(--dark-card) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
      },
    },
  },
} satisfies Config
