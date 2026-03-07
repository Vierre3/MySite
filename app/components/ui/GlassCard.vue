<template>
  <div
    class="backdrop-blur-xl bg-glass border border-glass-border rounded-2xl transition-all duration-300"
    :class="[
      hover && 'hover:bg-glass-hover hover:border-glass-border-hover hover:shadow-[0_0_30px_rgba(255,107,0,0.12)]',
      $attrs.class
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hover?: boolean
}>()
</script>
