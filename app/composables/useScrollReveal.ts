import { ref, onMounted, nextTick } from 'vue'

export function useScrollReveal(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const skipAnimation = ref(false)

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

      if (inViewport) {
        // Already visible: skip the opacity transition to avoid Safari backdrop-blur bug
        skipAnimation.value = true
        isVisible.value = true
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        },
        { threshold }
      )

      observer.observe(target.value)
    })
  })

  return { target, isVisible, skipAnimation }
}
