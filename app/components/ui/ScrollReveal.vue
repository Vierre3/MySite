<template>
  <div
    ref="target"
    class="scroll-reveal"
    :class="{ revealed: isVisible, 'no-transition': skipAnimation }"
    :style="delayStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })
const { target, isVisible, skipAnimation } = useScrollReveal()
const applyDelay = ref(true)
const delayStyle = computed(() => applyDelay.value ? { transitionDelay: `${props.delay}ms` } : {})

onMounted(() => setTimeout(() => { applyDelay.value = false }, 500))
</script>
