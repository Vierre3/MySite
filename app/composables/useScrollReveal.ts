export function useScrollReveal() {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const skipAnimation = ref(false)
  const { isRestoring } = useScrollRestore()
  let observer: IntersectionObserver | undefined

  onMounted(() => nextTick(() => {
    if (!target.value) { isVisible.value = true; skipAnimation.value = true; return }

    // Already in viewport on mount (e.g. dynamically created via filter change)
    const rect = target.value.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) { isVisible.value = true; return }

    // Observe for scroll into viewport
    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { isVisible.value = true; observer?.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(target.value)

    // After scroll restore, instantly reveal elements already above the viewport
    if (isRestoring.value) {
      const stop = watch(isRestoring, (restoring) => {
        if (!restoring && !isVisible.value && target.value) {
          if (target.value.getBoundingClientRect().top < window.innerHeight) {
            skipAnimation.value = true; isVisible.value = true; observer?.disconnect()
          }
        }
        stop()
      })
    }
  }))

  onUnmounted(() => observer?.disconnect())

  return { target, isVisible, skipAnimation }
}
