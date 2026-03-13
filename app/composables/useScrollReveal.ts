import { ref, onMounted, nextTick, watch } from 'vue'

export function useScrollReveal(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const skipAnimation = ref(false)

  const { isRestoring } = useScrollRestore()

  onMounted(() => {
    nextTick(() => {
      if (!target.value) {
        isVisible.value = true
        skipAnimation.value = true
        return
      }

      // Check if element is already in viewport on mount
      const rect = target.value.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (inViewport) {
        // Dynamically created (e.g. filter change): slide up
        isVisible.value = true
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        },
        { threshold }
      )

      observer.observe(target.value)

      // When scroll restore finishes, reveal all elements at or above the viewport
      // (already scrolled past or currently visible) — only elements below should animate
      if (isRestoring.value) {
        const stop = watch(isRestoring, (restoring) => {
          if (!restoring && !isVisible.value && target.value) {
            const r = target.value.getBoundingClientRect()
            if (r.top < window.innerHeight) {
              skipAnimation.value = true
              isVisible.value = true
              observer.disconnect()
            }
          }
          stop()
        })
      }
    })
  })

  return { target, isVisible, skipAnimation }
}
