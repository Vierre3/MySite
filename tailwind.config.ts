import type { Config } from 'tailwindcss'

export default {
  // Wraps every `hover:` / `group-hover:` utility in `@media (hover: hover)`, so
  // touch devices never get a hover state stuck on the last tapped element.
  // Touch feedback is carried by the `active:` utilities instead.
  future: {
    hoverOnlyWhenSupported: true,
  },
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
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
        'glass': 'var(--glass)',
        'glass-hover': 'var(--glass-hover)',
        'glass-border': 'var(--glass-border)',
        'dark-bg': 'rgb(var(--dark-bg) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
      },
    },
  },
} satisfies Config
