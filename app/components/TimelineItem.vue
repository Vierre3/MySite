<template>
  <div class="relative flex gap-2 sm:gap-6 md:gap-10 min-w-0">
    <!-- Timeline dot & line -->
    <div class="flex flex-col items-center" aria-hidden="true">
      <div class="w-4 h-4 rounded-full bg-orange-accent border-4 border-dark-bg z-10 shrink-0" />
      <div class="w-0.5 flex-1 bg-gradient-to-b from-orange-accent/40 to-transparent" />
    </div>

    <!-- Content -->
    <div class="pb-8 flex-1 min-w-0">
      <UiGlassCard class="p-6">
        <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-4">
          <div>
            <h3 class="text-lg font-semibold text-text-primary">
              {{ $t(`experience.${entryKey}.role`) }}
            </h3>
            <p class="text-orange-accent font-medium">
              {{ $t(`experience.${entryKey}.company`) }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span v-if="current" class="pill-current">
              {{ $t('projects.inProgress') }}
            </span>
            <span class="text-sm text-text-secondary whitespace-nowrap">
              {{ $t(`experience.${entryKey}.date`) }}
            </span>
          </div>
        </div>
        <ul class="space-y-2">
          <li
            v-for="(item, i) in tm(`experience.${entryKey}.items`)"
            :key="i"
            class="flex items-start gap-2 text-text-secondary text-sm leading-relaxed"
          >
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-orange-accent shrink-0 mt-0.5" />
            <span>{{ rt(item) }}</span>
          </li>
        </ul>
      </UiGlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ entryKey: string; current?: boolean }>()
const { tm, rt } = useI18n()
</script>
