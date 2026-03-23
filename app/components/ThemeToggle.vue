<template>
  <button
    class="relative flex items-center px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 active:scale-95 md:active:scale-100 transition-[transform,box-shadow,border-color] duration-300 cursor-pointer"
    @click="toggleTheme"
  >
    <Icon name="mdi:sun-moon-stars" class="w-4 h-4" />
    <span class="toggle-text md:!grid-cols-[1fr] md:!ml-1" :class="showText ? 'grid-cols-[1fr] ml-1' : 'grid-cols-[0fr]'">
      <span class="overflow-hidden min-w-0">{{ theme === 'dark' ? $t('nav.theme_light') : $t('nav.theme_dark') }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme()

defineProps<{
  showText: boolean
}>()
</script>

<style scoped>
.toggle-text {
  display: grid;
  transition: grid-template-columns 200ms ease, margin 200ms ease;
}
</style>
