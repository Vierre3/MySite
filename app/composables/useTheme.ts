const STORAGE_KEY = 'theme'
const theme = ref<'dark' | 'light'>('dark')

function applyTheme(value: 'dark' | 'light') {
  const el = document.documentElement
  el.classList.remove('dark', 'light')
  el.classList.add(value)
}

if (import.meta.client) {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  }
  // Apply on init — the inline script in <head> handles the flash-free first paint,
  // this ensures Vue's reactive state matches the DOM after hydration
  applyTheme(theme.value)
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, theme.value)
      applyTheme(theme.value)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
