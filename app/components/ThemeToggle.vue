<template>
  <button
    class="relative flex items-center gap-1 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 active:scale-95 md:active:scale-100 transition-all duration-300 cursor-pointer"
    @click="toggleTheme"
  >
    <Icon name="mdi:sun-moon-stars" class="w-4 h-4" />
    <span class="toggle-label">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
</script>
