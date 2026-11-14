<template>
  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-teal/10 text-teal border border-teal/20">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
