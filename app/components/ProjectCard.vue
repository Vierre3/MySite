<template>
  <UiGlassCard class="p-6 flex flex-col">
    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div class="flex items-center gap-2.5">
        <h3 class="text-lg font-semibold text-text-primary">
          <span class="text-orange-accent select-none" aria-hidden="true">/ </span>{{ project.key }}
        </h3>
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 -m-2 text-text-secondary hover:text-orange-accent transition-colors"
          :aria-label="`${link.label}: ${project.key}`"
          :title="link.label"
        >
          <Icon :name="link.icon" class="w-5 h-5 block" />
        </a>
      </div>
      <!-- Location then status, on the name's line. This box takes the space left
           beside the name: if both pills fit they sit side by side, otherwise the
           status wraps under the location, and if not even one fits the box drops
           below the name. -->
      <div class="flex flex-1 flex-wrap justify-end gap-1.5">
        <span class="text-xs px-2 py-1 rounded-full border border-glass-border text-text-secondary whitespace-nowrap">
          {{ $t(`projects.types.${project.type}`) }}
        </span>
        <span v-if="project.current" class="pill-current">
          {{ $t('projects.inProgress') }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-text-secondary text-sm leading-relaxed mb-3">
      {{ $t(`projects.${project.key}`) }}
    </p>

    <!-- Team size and my part in it -->
    <p class="text-text-primary text-sm leading-relaxed mb-4 flex-1">
      {{ $t(`projectRoles.${project.key}`) }}
    </p>

    <!-- Tech tags: wrap upwards, so the fullest row sits on the card's bottom edge -->
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

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()

const links = computed(() => [
  props.project.github && { href: props.project.github, icon: 'mdi:github', label: t('projects.viewCode') },
  props.project.liveUrl && { href: props.project.liveUrl, icon: 'mdi:web', label: t('projects.tryIt') },
  props.project.playUrl && { href: props.project.playUrl, icon: 'mdi:play-circle-outline', label: t('projects.play') },
].filter(link => !!link))
</script>
