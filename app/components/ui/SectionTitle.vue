<template>
  <div class="text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
      {{ $t(titleKey) }}
    </h2>
    <div class="w-20 h-1 bg-orange-accent mx-auto rounded-full" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  titleKey: string
}>()
</script>
