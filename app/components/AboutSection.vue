<template>
  <UiSection id="about" title-key="about.title">
    <UiScrollReveal>
      <UiGlassCard class="p-8 md:p-12">
        <div class="flex flex-col md:flex-row items-center gap-10">
          <img
            src="/images/profile.webp"
            :alt="$t('about.photoAlt')"
            loading="lazy"
            width="160"
            height="160"
            class="shrink-0 w-40 h-40 rounded-full border-2 border-orange-accent/50 object-cover"
          >
          <p class="flex-1 text-center md:text-left text-text-secondary leading-relaxed text-base md:text-lg">
            {{ $t('about.bio') }}
          </p>
        </div>

        <dl class="grid grid-cols-1 min-[333px]:grid-cols-3 gap-6 mt-10 pt-8 border-t border-glass-border">
          <div v-for="stat in ['internships', 'months', 'projects']" :key="stat" class="flex flex-col-reverse text-center">
            <dt class="text-sm text-text-secondary">
              {{ $t(`about.stats.${stat}.label`) }}
            </dt>
            <dd class="text-3xl md:text-4xl font-bold text-orange-accent mb-1">
              {{ $t(`about.stats.${stat}.value`) }}
            </dd>
          </div>
        </dl>
      </UiGlassCard>
    </UiScrollReveal>
  </UiSection>
</template>
