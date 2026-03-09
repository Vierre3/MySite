const isRestoring = ref(false)

export function useScrollRestore() {
  return { isRestoring: readonly(isRestoring) }
}

// Call before locale navigation to skip animations on remount
export function setRestoring(value: boolean) {
  isRestoring.value = value
}

export function setupScrollRestore() {
  if (import.meta.server) return

  const STORAGE_KEY = 'scroll-position'

  // Release isRestoring after route changes (locale switches)
  const router = useRouter()
  router.afterEach(() => {
    if (isRestoring.value) {
      nextTick(() => {
        requestAnimationFrame(() => {
          isRestoring.value = false
        })
      })
    }
  })

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
        }
      }

      nextTick(() => {
        requestAnimationFrame(tryRestore)
      })
    }
  })
}
