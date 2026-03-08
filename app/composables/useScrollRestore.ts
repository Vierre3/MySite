const isRestoring = ref(false)

export function useScrollRestore() {
  return { isRestoring: readonly(isRestoring) }
}

export function setupScrollRestore() {
  if (import.meta.server) return

  // Take control of scroll restoration from the browser
  history.scrollRestoration = 'manual'

  const STORAGE_KEY = 'scroll-position'
  let ticking = false

  const savedY = sessionStorage.getItem(STORAGE_KEY)
  const restoreY = savedY ? parseInt(savedY, 10) : 0

  // If we have a saved position, mark as restoring so animations can be skipped
  if (restoreY > 0) {
    isRestoring.value = true
  }

  // Save scroll position on scroll
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY))
      ticking = false
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Restore scroll position after hydration
  if (restoreY > 0) {
    // Wait for next tick + small delay to ensure DOM is rendered
    nextTick(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, restoreY)
        // Clear restoring flag after scroll is restored
        setTimeout(() => {
          isRestoring.value = false
        }, 100)
      })
    })
  }
}
