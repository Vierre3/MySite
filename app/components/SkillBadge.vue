<template>
  <div class="flex items-center gap-[5px] px-3 py-2 rounded-lg bg-dark-bg/50 border border-glass-border group">
    <Icon
      :name="icon"
      class="w-5 h-5 transition-colors text-text-secondary"
    />
    <span class="text-sm text-text-secondary">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  icon: string
  mono?: boolean
}>()
</script>
