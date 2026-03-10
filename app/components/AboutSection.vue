<template>
  <section id="about" class="py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <UiSectionTitle title-key="about.title" />

      <UiScrollReveal>
        <UiGlassCard hover class="p-8 md:p-12">
          <div class="flex flex-col md:flex-row items-center gap-10">
            <!-- Profile photo -->
            <div class="shrink-0">
              <img
                src="/images/profile.jpg"
                alt="Pierre-Yves"
                loading="lazy"
                class="w-40 h-40 rounded-full border-2 border-orange-accent/50 object-cover shadow-[0_0_30px_rgba(255,107,0,0.15)]"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              />
            </div>

            <!-- Bio -->
            <div class="flex-1 text-center md:text-left">
              <p class="text-text-secondary leading-relaxed text-base md:text-lg">
                {{ $t('about.bio') }}
              </p>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-glass-border">
            <StatCard
              :value="$t('about.stats.languagesCount')"
              :label="$t('about.stats.languages')"
            />
            <StatCard
              :value="$t('about.stats.projectsCount')"
              :label="$t('about.stats.projects')"
            />
            <StatCard
              :value="$t('about.stats.experienceCount')"
              :label="$t('about.stats.experience')"
            />
          </div>
        </UiGlassCard>
      </UiScrollReveal>
    </div>
  </section>
</template>
