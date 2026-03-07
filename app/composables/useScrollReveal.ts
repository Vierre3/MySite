import { ref, onMounted, nextTick } from 'vue'

export function useScrollReveal(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    nextTick(() => {
      if (!target.value) {
        isVisible.value = true
        return
      }

      if (typeof IntersectionObserver === 'undefined') {
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

  return { target, isVisible }
}
