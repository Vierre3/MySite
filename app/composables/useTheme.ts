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
    if (!import.meta.client) return
    localStorage.setItem('theme', theme.value)

    // Desktop: use View Transitions API — crossfades 2 screenshots instead of
    // animating hundreds of individual elements (fixes Chromium perf)
    // Mobile: skip (backdrop-filter doesn't survive the view transition screenshot)
    const canViewTransition = 'startViewTransition' in document && window.innerWidth >= 768

    if (canViewTransition) {
      // Suppress per-element * transitions during view transition
      document.documentElement.classList.add('vt-theme')
      const transition = (document as any).startViewTransition(() => {
        applyTheme(theme.value)
      })
      transition.finished.then(() => {
        document.documentElement.classList.remove('vt-theme')
      })
    } else {
      // Mobile fallback: use existing * CSS transitions
      applyTheme(theme.value)
    }
  }

  return { theme: readonly(theme), toggleTheme }
}
