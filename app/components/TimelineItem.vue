<template>
  <div class="relative flex gap-6 md:gap-10">
    <!-- Timeline dot & line -->
    <div class="flex flex-col items-center">
      <div class="w-4 h-4 rounded-full bg-orange-accent border-4 border-dark-bg shadow-[0_0_15px_rgba(255,107,0,0.4)] z-10 shrink-0" />
      <div class="w-0.5 flex-1 bg-gradient-to-b from-orange-accent/40 to-transparent" />
    </div>

    <!-- Content -->
    <div class="pb-12 flex-1">
      <UiGlassCard hover class="p-6">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-text-primary">
            {{ $t(`experience.${entryKey}.role`) }}
          </h3>
          <div class="flex justify-between items-start gap-2">
            <p class="text-orange-accent font-medium">
              {{ $t(`experience.${entryKey}.company`) }}
            </p>
            <div class="flex items-center gap-2 translate-y-2 mb-2 sm:translate-y-0 sm:mb-0 sm:-mt-6">
              <span
                v-if="current"
                class="text-xs px-2 py-1 rounded-full bg-orange-accent/20 border border-orange-accent/40 text-orange-accent font-medium whitespace-nowrap"
              >
                {{ $t('projects.inProgress') }}
              </span>
              <span class="text-sm text-text-secondary whitespace-nowrap">
                {{ $t(`experience.${entryKey}.date`) }}
              </span>
            </div>
          </div>
        </div>
        <ul class="space-y-2">
          <li
            v-for="(item, i) in items"
            :key="i"
            class="flex items-start gap-2 text-text-secondary text-sm leading-relaxed"
          >
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-orange-accent shrink-0 mt-0.5" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </UiGlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ entryKey: string; current?: boolean }>()
const { t, te } = useI18n()

const items = computed(() => {
  const r: string[] = []
  for (let i = 0; te(`experience.${props.entryKey}.items[${i}]`); i++) r.push(t(`experience.${props.entryKey}.items[${i}]`))
  return r
})
</script>
