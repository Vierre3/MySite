const STORAGE_KEY = 'theme'
const theme = ref<'dark' | 'light'>('dark')

if (import.meta.client) {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  }
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, theme.value)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
