<template>
  <section id="skills" class="py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <UiSectionTitle title-key="skills.title" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiScrollReveal
          v-for="(category, index) in skillsData"
          :key="category.key"
          :delay="index * 100"
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
