const STORAGE_KEY = 'theme'
const theme = ref<'dark' | 'light'>('dark')
let initialized = false

function applyTheme(value: 'dark' | 'light') {
  const el = document.documentElement
  el.classList.remove('dark', 'light')
  el.classList.add(value)
}

export function useTheme() {
  // Defer localStorage read to after hydration to avoid mismatch.
  // The inline <script> in <head> already handles the visual (no flash).
  if (import.meta.client && !initialized) {
    initialized = true
    onNuxtReady(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') {
        theme.value = saved
        applyTheme(saved)
      }
    })
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, theme.value)
      applyTheme(theme.value)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
