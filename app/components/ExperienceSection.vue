<template>
  <section id="experience" class="py-24 px-4">
    <div class="max-w-4xl mx-auto">
      <UiSectionTitle title-key="experience.title" />

      <div>
        <UiScrollReveal
          v-for="(entry, index) in experienceData"
          :key="entry.key"
          :delay="index * 150"
        >
          <TimelineItem :entry-key="entry.key" :current="entry.current" />
        </UiScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const experienceData = useExperienceData()
</script>
