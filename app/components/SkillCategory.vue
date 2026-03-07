<template>
  <UiGlassCard hover class="p-6">
    <h3 class="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
      <div class="w-2 h-2 rounded-full bg-orange-accent" />
      {{ $t(`skills.${categoryKey}`) }}
    </h3>
    <div class="flex flex-wrap gap-2">
      <SkillBadge
        v-for="skill in skills"
        :key="skill.name"
        :name="skill.name"
        :icon="skill.icon"
      />
    </div>
  </UiGlassCard>
</template>

<script setup lang="ts">
import type { Skill } from '~/composables/useSkillsData'

defineProps<{
  categoryKey: string
  skills: Skill[]
}>()
</script>
