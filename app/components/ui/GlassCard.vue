<template>
  <div class="relative rounded-2xl border-[0.75px] border-glass-border h-full transition-transform duration-300 hover:-translate-y-1">
    <UiGlowingEffect
      v-if="hover && mounted"
      :spread="180"
      :glow="true"
      :proximity="90"
      :border-width="2"
    />
    <div
      class="relative h-full backdrop-blur-xl bg-glass rounded-[inherit] transition-[background-color,box-shadow] duration-300"
      :class="[
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
onMounted(() => {
  if (document.readyState === 'complete') mounted.value = true
  else window.addEventListener('load', () => { mounted.value = true }, { once: true })
})
</script>
