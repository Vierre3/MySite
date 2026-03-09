<template>
  <section id="skills" class="py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <UiSectionTitle title-key="skills.title" />

      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <UiScrollReveal
          v-for="(category, index) in skillsData"
          :key="category.key"
          :delay="index * 100"
          class="break-inside-avoid py-1 [backface-visibility:hidden]"
        >
          <SkillCategory
            :category-key="category.key"
            :skills="category.skills"
          />
        </UiScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillsData = useSkillsData()
</script>
