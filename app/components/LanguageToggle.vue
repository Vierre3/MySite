<template>
  <button
    class="btn-ghost flex items-center px-3 py-1.5 rounded-lg text-sm font-medium"
    :aria-label="target === 'fr' ? 'Passer en français' : 'Switch to English'"
    :lang="target"
    @click="navigateTo(switchLocalePath(target))"
  >
    <Icon name="mdi:translate" class="w-4 h-4" />
    <span class="toggle-text md:!grid-cols-[1fr] md:!ml-1" :class="showText ? 'grid-cols-[1fr] ml-1' : 'grid-cols-[0fr]'">
      <span class="overflow-hidden min-w-0">{{ target }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const target = computed(() => locale.value === 'en' ? 'fr' : 'en')

defineProps<{
  showText: boolean
}>()
</script>
