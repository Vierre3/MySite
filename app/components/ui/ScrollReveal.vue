<template>
  <div
    ref="target"
    class="scroll-reveal"
    :class="{ revealed: isVisible }"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
}>(), {
  delay: 0,
})

const { target, isVisible } = useScrollReveal()
</script>
