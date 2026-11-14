<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :download="download || undefined"
    :target="href && !download ? '_blank' : undefined"
    :rel="href && !download ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer transition-[background-color,transform] duration-200 active:scale-[0.97]"
    :class="variant === 'solid'
      ? 'bg-orange-accent text-on-accent hover:bg-orange-light'
      : 'border border-orange-accent text-orange-accent hover:bg-orange-accent/15'"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'solid' | 'outline'
  href?: string
  download?: string
}>()
</script>
