<template>
  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-orange-accent/10 text-orange-light border border-orange-accent/20">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
