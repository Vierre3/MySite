const isRestoring = ref(false)

export function useScrollRestore() {
  return { isRestoring: readonly(isRestoring) }
}

export function setupScrollRestore() {
  if (import.meta.server) return
  const KEY = 'scroll-position'

  onMounted(() => {
    // Take control of scroll restoration from the browser
    history.scrollRestoration = 'manual'

    // Save scroll position on scroll (throttled via rAF)
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { sessionStorage.setItem(KEY, String(window.scrollY)); ticking = false })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    // Restore scroll position (retry up to 10 frames until content is tall enough)
    const restoreY = parseInt(sessionStorage.getItem(KEY) || '0', 10)
    if (restoreY <= 0) { document.documentElement.classList.remove('scrolled'); return }

    isRestoring.value = true
    let attempts = 0
    const tryRestore = () => {
      window.scrollTo(0, restoreY)
      if (++attempts < 10 && Math.abs(window.scrollY - restoreY) > 2) requestAnimationFrame(tryRestore)
      else isRestoring.value = false
    }
    nextTick(() => requestAnimationFrame(tryRestore))
  })
}
