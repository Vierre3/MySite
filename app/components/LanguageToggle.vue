<template>
  <button
    class="relative flex items-center gap-1 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer"
    @click="toggleLocale"
  >
    <Icon name="mdi:translate" class="w-4 h-4" />
    <span class="uppercase">{{ locale === 'en' ? 'FR' : 'EN' }}</span>
  </button>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'fr' : 'en')
  // Force repaint on iOS Safari — backdrop-blur prevents automatic repaints
  nextTick(() => {
    document.body.style.transform = 'translateZ(0)'
    requestAnimationFrame(() => {
      document.body.style.transform = ''
    })
  })
}
</script>
