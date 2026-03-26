<template>
  <UiGlassCard hover class="p-6 h-full flex flex-col group">
    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div class="flex items-center gap-2">
        <span class="text-orange-accent font-bold text-lg select-none">/</span>
        <h3 class="text-lg font-semibold text-text-primary">
          {{ project.key }}
        </h3>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-secondary hover:text-orange-accent hover:scale-110 active:scale-75 md:active:scale-100 transition-all"
          :title="$t('projects.viewCode')"
        >
          <Icon name="mdi:open-in-new" class="w-4 h-4 mt-1.5" />
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-secondary hover:text-orange-accent hover:scale-110 active:scale-75 md:active:scale-100 transition-all"
          :title="$t('projects.tryIt')"
        >
          <Icon name="mdi:rocket-launch-outline" class="w-4 h-4 mt-1.5" />
        </a>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-if="project.current"
          class="text-xs px-2 py-1 rounded-full bg-orange-accent/20 border border-orange-accent/40 text-orange-accent font-medium whitespace-nowrap"
        >
          {{ $t('projects.inProgress') }}
        </span>
        <span class="text-xs px-2 py-1 rounded-full border border-glass-border text-text-secondary whitespace-nowrap">
          {{ $t(`projects.types.${project.type}`) }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
      {{ $t(`projects.${project.key}`) }}
    </p>

    <!-- Tech tags -->
    <div class="flex flex-wrap-reverse gap-2 mt-auto">
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
