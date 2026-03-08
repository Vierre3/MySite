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

  // Restore scroll position after hydration, retrying until layout settles
  if (restoreY > 0) {
    let attempts = 0
    const maxAttempts = 10

    const tryRestore = () => {
      window.scrollTo(0, restoreY)
      attempts++

      if (attempts < maxAttempts && Math.abs(window.scrollY - restoreY) > 2) {
        requestAnimationFrame(tryRestore)
      } else {
        isRestoring.value = false
      }
    }

    nextTick(() => {
      requestAnimationFrame(tryRestore)
    })
  }
}
