const theme = ref<'dark' | 'light'>('dark')
let initialized = false

function applyTheme(v: 'dark' | 'light') {
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(v)
}

export function useTheme() {
  // Defer localStorage read to after hydration to avoid mismatch
  // (the inline <head> script already handles the visual, no flash)
  if (import.meta.client && !initialized) {
    initialized = true
    onNuxtReady(() => {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') { theme.value = saved; applyTheme(saved) }
    })
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem('theme', theme.value)
      document.documentElement.classList.add('theme-switching')
      applyTheme(theme.value)
      setTimeout(() => document.documentElement.classList.remove('theme-switching'), 350)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
