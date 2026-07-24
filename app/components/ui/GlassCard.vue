<template>
  <div
    ref="rootEl"
    class="relative rounded-2xl border-[0.75px] border-glass-border h-full transition-transform duration-300 hover:-translate-y-1"
  >
    <UiGlowingEffect
      v-if="hover && mounted"
      :spread="180"
      :glow="true"
      :proximity="90"
      :border-width="2"
    />
    <div
      class="relative h-full bg-glass rounded-[inherit] transition-[background-color,box-shadow] duration-300"
      :class="[
        blurActive ? 'backdrop-blur-md' : '',
        hover && ' hover:bg-glass-hover hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]',
        $attrs.class as string
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{ hover?: boolean }>()

const mounted = ref(false)

// `backdrop-blur` is the expensive part of the frosted glass: the browser must
// re-sample and blur everything behind the card whenever the animated
// background moves. Cards far from the viewport don't need it, so we switch it
// off for them. This is a PAINT-only change (backdrop-filter never affects
// layout), so it cannot shift the scroll position — unlike content-visibility.
// A generous rootMargin re-enables the blur well before the card is visible, so
// the user only ever sees blurred cards. Defaults to on for SSR / no-JS.
const rootEl = ref<HTMLElement>()
const blurActive = ref(true)

onMounted(() => {
  if (document.readyState === 'complete') mounted.value = true
  else window.addEventListener('load', () => { mounted.value = true }, { once: true })

  if (typeof IntersectionObserver === 'undefined' || !rootEl.value) return
  const io = new IntersectionObserver(
    ([entry]) => { if (entry) blurActive.value = entry.isIntersecting },
    { rootMargin: '400px 0px' },
  )
  io.observe(rootEl.value)
  onUnmounted(() => io.disconnect())
})
</script>
