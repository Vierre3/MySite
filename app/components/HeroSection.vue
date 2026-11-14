<template>
  <section id="hero" class="relative min-h-[calc(100svh-3rem)] flex items-center px-4 py-24">
    <div class="max-w-5xl mx-auto w-full">
      <p class="hero-fade text-lg font-medium text-orange-accent mb-4">
        {{ $t('hero.role') }}
      </p>

      <h1 class="hero-fade text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-text-primary mb-6" style="--delay: 60ms;">
        {{ $t('hero.name') }}
      </h1>

      <p class="hero-fade text-xl md:text-2xl text-balance text-text-primary max-w-3xl mb-4" style="--delay: 120ms;">
        {{ $t('hero.statement') }}
      </p>

      <p class="hero-fade text-base md:text-lg text-pretty text-text-secondary max-w-xl mb-10" style="--delay: 180ms;">
        {{ $t('hero.context') }}
      </p>

      <div class="hero-fade flex flex-col sm:flex-row items-start sm:items-center gap-4" style="--delay: 240ms;">
        <UiOrangeButton variant="solid" @click="scrollToSection('contact')">
          <Icon name="mdi:alternate-email" class="w-5 h-5" />
          {{ $t('hero.cta_contact') }}
        </UiOrangeButton>
        <UiOrangeButton variant="outline" href="/resume.pdf" download="CV Pierre-Yves Guiraudet.pdf">
          <Icon name="mdi:download" class="w-5 h-5" />
          {{ $t('hero.cta_resume') }}
        </UiOrangeButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { scrollToSection } = useSmoothScroll()
</script>

<style>
.hero-fade {
  animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
}
</style>
