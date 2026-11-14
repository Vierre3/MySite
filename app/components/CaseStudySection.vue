<template>
  <UiSection id="work" title-key="caseStudy.title">
    <UiScrollReveal>
      <UiGlassCard class="p-6 md:p-10">
        <p class="text-sm font-medium text-teal mb-3">
          {{ $t('caseStudy.meta') }}
        </p>
        <h3 class="text-2xl md:text-3xl font-bold text-balance text-text-primary mb-4">
          {{ $t('caseStudy.heading') }}
        </h3>
        <p class="text-text-secondary md:text-lg leading-relaxed max-w-3xl">
          {{ $t('caseStudy.intro') }}
        </p>

        <!-- Architecture diagram: the three codebases in the order a request
             travels, with what flows between them. Stacks vertically on phones. -->
        <div class="flex flex-col lg:flex-row items-stretch mt-8">
          <template v-for="(part, index) in parts" :key="part.key">
            <div
              v-if="index > 0"
              class="flex lg:flex-col items-center justify-center gap-x-5 gap-y-2 shrink-0 lg:w-36 py-3 lg:py-0 text-xs"
            >
              <span class="flex items-center gap-1 text-teal">
                {{ $t(`caseStudy.diagram.${part.incoming}`) }}
                <Icon name="mdi:arrow-right" class="w-4 h-4 hidden lg:block" />
                <Icon name="mdi:arrow-down" class="w-4 h-4 lg:hidden" />
              </span>
              <span class="flex items-center gap-1 text-orange-accent lg:text-center">
                <Icon name="mdi:arrow-left" class="w-4 h-4 shrink-0 hidden lg:block" />
                <Icon name="mdi:arrow-up" class="w-4 h-4 shrink-0 lg:hidden" />
                {{ $t('caseStudy.diagram.events') }}
              </span>
            </div>

            <div class="flex-1 rounded-xl border border-glass-border bg-dark-bg/40 p-5 flex flex-col">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <Icon :name="part.icon" class="w-5 h-5 text-orange-accent" />
                <h4 class="font-semibold text-text-primary">
                  {{ $t(`caseStudy.parts.${part.key}.name`) }}
                </h4>
                <span v-if="part.key === 'agent'" class="text-xs px-2 py-0.5 rounded-full border border-glass-border text-text-secondary whitespace-nowrap">
                  {{ $t('caseStudy.diagram.perServer') }}
                </span>
              </div>
              <p class="text-sm text-text-secondary leading-relaxed mb-4">
                {{ $t(`caseStudy.parts.${part.key}.detail`) }}
              </p>
              <p class="text-xs font-medium text-teal mt-auto">
                {{ $t(`caseStudy.parts.${part.key}.size`) }}
              </p>
            </div>
          </template>
        </div>

        <!-- External systems the control plane talks to -->
        <div class="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-dashed border-glass-border text-xs">
          <span class="w-full sm:w-auto text-center text-text-secondary sm:mr-1">{{ $t('caseStudy.diagram.integrations') }}</span>
          <span
            v-for="(service, i) in tm('caseStudy.diagram.services')"
            :key="i"
            class="px-3 py-1.5 rounded-lg border border-glass-border bg-dark-bg/40 text-text-secondary"
          >
            {{ rt(service) }}
          </span>
        </div>

        <h4 class="text-lg font-semibold text-text-primary mt-10 mb-5">
          {{ $t('caseStudy.problemsTitle') }}
        </h4>
        <div class="grid gap-6 md:grid-cols-2">
          <div v-for="problem in ['sse', 'libvirt']" :key="problem" class="border-l-2 border-orange-accent/60 pl-4">
            <h5 class="font-semibold text-text-primary mb-1">
              {{ $t(`caseStudy.problems.${problem}.title`) }}
            </h5>
            <p class="text-sm text-text-secondary leading-relaxed">
              {{ $t(`caseStudy.problems.${problem}.text`) }}
            </p>
          </div>
        </div>

        <h4 class="text-lg font-semibold text-text-primary mt-10 mb-4">
          {{ $t('caseStudy.scopeTitle') }}
        </h4>
        <div class="flex flex-wrap gap-2">
          <UiTechTag v-for="(item, i) in tm('caseStudy.scope')" :key="i" :label="rt(item)" />
        </div>

        <p class="text-xs text-text-secondary mt-8">
          {{ $t('caseStudy.note') }}
        </p>
      </UiGlassCard>
    </UiScrollReveal>
  </UiSection>
</template>

<script setup lang="ts">
const { tm, rt } = useI18n()

// Left to right: browser, control plane, hosts. `incoming` names what the part
// receives from the one before it; live events flow back the other way.
const parts = [
  { key: 'web', icon: 'mdi:monitor', incoming: '' },
  { key: 'control', icon: 'mdi:hub-outline', incoming: 'requests' },
  { key: 'agent', icon: 'mdi:server-outline', incoming: 'commands' },
]
</script>
