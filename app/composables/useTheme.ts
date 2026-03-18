const theme = ref<'dark' | 'light'>('dark')
let initialized = false
let transitionTimer: ReturnType<typeof setTimeout> | null = null

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

      const root = document.documentElement

      // Add transitions + switch theme in the same frame (no reflow needed).
      // The browser batches both class changes and applies them together,
      // so transitions are active when the color values change.
      root.classList.add('theme-transitioning')
      applyTheme(theme.value)

      if (transitionTimer) clearTimeout(transitionTimer)
      transitionTimer = setTimeout(() => {
        root.classList.remove('theme-transitioning')
        transitionTimer = null
      }, 300)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
