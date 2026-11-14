<template>
  <button class="btn-ghost flex items-center px-3 py-1.5 rounded-lg text-sm font-medium" @click="toggleTheme">
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
