<template>
  <UiSection id="experience" title-key="experience.title">
    <UiScrollReveal
      v-for="(entry, index) in experienceData"
      :key="entry.key"
      :delay="index * 60"
    >
      <TimelineItem :entry-key="entry.key" :current="entry.current" />
    </UiScrollReveal>
  </UiSection>
</template>

<script setup lang="ts">
const experienceData = useExperienceData()
</script>
