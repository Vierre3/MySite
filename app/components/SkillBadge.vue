<template>
  <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-bg/50 border border-glass-border hover:border-orange-accent/30 transition-all duration-300 group">
    <Icon
      :name="icon"
      class="w-5 h-5 transition-colors"
      :class="mono ? 'text-orange-accent' : 'text-text-secondary group-hover:text-orange-accent'"
    />
    <span class="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  icon: string
  mono?: boolean
}>()
</script>
