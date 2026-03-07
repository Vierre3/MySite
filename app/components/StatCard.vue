<template>
  <div class="text-center">
    <div class="text-3xl md:text-4xl font-bold text-orange-accent mb-1">
      {{ value }}
    </div>
    <div class="text-sm text-text-secondary">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>
