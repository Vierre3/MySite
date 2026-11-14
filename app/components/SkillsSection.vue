<template>
  <UiSection id="skills" title-key="skills.title">
    <!-- CSS columns balance the cards' heights without any layout script -->
    <div class="columns-1 md:columns-2 lg:columns-3 gap-6">
      <UiScrollReveal
        v-for="(group, index) in skills"
        :key="group.key"
        :delay="index * 50"
        class="mb-6 break-inside-avoid"
      >
        <UiGlassCard class="p-6">
          <h3 class="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-orange-accent" aria-hidden="true" />
            {{ $t(`skills.${group.key}`) }}
          </h3>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="px-3 py-1.5 rounded-lg bg-dark-bg/50 border border-glass-border text-sm text-text-secondary"
            >
              {{ item }}
            </li>
          </ul>
        </UiGlassCard>
      </UiScrollReveal>
    </div>
  </UiSection>
</template>

<script setup lang="ts">
const skills = useSkillsData()
</script>
