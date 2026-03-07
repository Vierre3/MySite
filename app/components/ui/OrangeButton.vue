<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :download="download || undefined"
    :target="href && !download ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
    :class="[
      variant === 'solid'
        ? 'bg-orange-accent text-white hover:bg-orange-light hover:shadow-[0_0_25px_rgba(255,107,0,0.4)]'
        : 'border border-orange-accent text-orange-accent hover:bg-orange-accent/10 hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]'
    ]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'solid' | 'outline'
  href?: string
  download?: string | boolean
}>()

defineEmits<{
  click: []
}>()
</script>
