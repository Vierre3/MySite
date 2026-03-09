import { ref, onMounted, nextTick, watch } from 'vue'

let initialLoadComplete = false

// Mark initial load as complete after first render cycle, regardless of viewport state
if (import.meta.client) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initialLoadComplete = true
    })
  })
}

export function useScrollReveal(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const skipAnimation = ref(false)
  const fadeIn = ref(false)

  const { isRestoring } = useScrollRestore()

  onMounted(() => {
    nextTick(() => {
      if (!target.value) {
        isVisible.value = true
        skipAnimation.value = true
        return
      }

      if (typeof IntersectionObserver === 'undefined') {
        isVisible.value = true
        skipAnimation.value = true
        return
      }

      // Check if element is already in viewport on mount
      const rect = target.value.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (inViewport && !initialLoadComplete) {
        // Already visible on initial page load: skip animation to avoid Safari backdrop-blur bug
        skipAnimation.value = true
        isVisible.value = true
        requestAnimationFrame(() => { initialLoadComplete = true })
        return
      }

      if (inViewport) {
        // Dynamically created (e.g. filter change): fade in + slide up
        fadeIn.value = true
        requestAnimationFrame(() => {
          isVisible.value = true
        })
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

      // When scroll restore finishes, elements in viewport need to be revealed immediately
      // before .skip-animations is removed, otherwise they flash to opacity: 0
      if (isRestoring.value) {
        const stop = watch(isRestoring, (restoring) => {
          if (!restoring && !isVisible.value && target.value) {
            const r = target.value.getBoundingClientRect()
            if (r.top < window.innerHeight && r.bottom > 0) {
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

  return { target, isVisible, skipAnimation, fadeIn }
}
