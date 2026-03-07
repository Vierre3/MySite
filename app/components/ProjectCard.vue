<template>
  <UiGlassCard hover class="p-6 h-full flex flex-col group">
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <Icon name="mdi:folder-outline" class="w-8 h-8 text-orange-accent" />
        <h3 class="text-lg font-semibold text-text-primary group-hover:text-orange-accent transition-colors">
          {{ $t(`projects.${project.key}.name`) }}
        </h3>
      </div>
      <div class="flex items-center gap-2">
        <span
          v-if="project.current"
          class="text-xs px-2 py-1 rounded-full bg-orange-accent/20 border border-orange-accent/40 text-orange-accent font-medium"
        >
          In Progress
        </span>
        <span class="text-xs px-2 py-1 rounded-full border border-glass-border text-text-secondary">
          {{ $t(`projects.${project.key}.type`) }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
      {{ $t(`projects.${project.key}.description`) }}
    </p>

    <!-- Tech tags -->
    <div class="flex flex-wrap gap-2 mt-auto">
      <UiTechTag
        v-for="tag in project.techTags"
        :key="tag"
        :label="tag"
      />
    </div>
  </UiGlassCard>
</template>

<script setup lang="ts">
import type { Project } from '~/composables/useProjectsData'

defineProps<{
  project: Project
}>()
</script>
