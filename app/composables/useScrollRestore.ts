const isRestoring = ref(false)

export function useScrollRestore() {
  return { isRestoring: readonly(isRestoring) }
}

export function setupScrollRestore() {
  if (import.meta.server) return

  const STORAGE_KEY = 'scroll-position'

  onMounted(() => {
    // Take control of scroll restoration from the browser
    history.scrollRestoration = 'manual'

    // Save scroll position on scroll
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        sessionStorage.setItem(STORAGE_KEY, String(window.scrollY))
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    // Restore scroll position
    const savedY = sessionStorage.getItem(STORAGE_KEY)
    const restoreY = savedY ? parseInt(savedY, 10) : 0

    if (restoreY > 0) {
      isRestoring.value = true

      let attempts = 0
      const maxAttempts = 10

      const tryRestore = () => {
        window.scrollTo(0, restoreY)
        attempts++

        if (attempts < maxAttempts && Math.abs(window.scrollY - restoreY) > 2) {
          requestAnimationFrame(tryRestore)
        } else {
          isRestoring.value = false
          // Remove pre-hydration class — Vue handles it from here
          document.documentElement.classList.remove('scrolled')
        }
      }

      nextTick(() => {
        requestAnimationFrame(tryRestore)
      })
    } else {
      // No scroll to restore — remove pre-hydration class immediately
      document.documentElement.classList.remove('scrolled')
    }
  })
}
