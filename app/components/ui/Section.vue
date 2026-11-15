<template>
  <section :id="id" class="py-16 md:py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- animated on scroll: see "Section titles" in assets/css/animations.css -->
      <div class="section-title text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-balance">
          {{ $t(titleKey) }}
        </h2>
        <div class="section-title-bar w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-orange-accent to-teal" />
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
