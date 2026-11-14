<template>
  <section :id="id" class="py-16 md:py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-balance">
          {{ $t(titleKey) }}
        </h2>
        <div class="w-20 h-1 bg-orange-accent mx-auto rounded-full" />
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  titleKey: string
}>()
</script>
