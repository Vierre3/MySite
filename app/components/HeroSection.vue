<template>
  <section id="hero" class="relative min-h-[calc(100vh-3rem)] flex items-center justify-center px-4 overflow-hidden">
    <!-- Globe background -->
    <!-- <GlobeCanvas /> -->

    <div class="relative z-10 text-center max-w-3xl mx-auto">
      <!-- Greeting -->
      <p class="hero-fade text-lg md:text-xl mb-3 text-text-secondary">
        {{ $t('hero.greeting') }}
      </p>

      <!-- Name -->
      <h1 class="hero-fade text-5xl md:text-7xl font-bold mb-4 text-text-primary" style="--delay: 0.2s;">
        {{ $t('hero.name') }}
      </h1>

      <!-- Title -->
      <div class="hero-fade flex items-center justify-center mb-3" style="--delay: 0.4s;">
        <div class="terminal-box inline-flex items-center gap-1 px-3 py-1.5 border border-orange-accent/50 rounded-md bg-orange-accent/5">
          <span class="font-mono text-base md:text-lg tracking-widest text-orange-accent">
            {{ $t('hero.title') }}
          </span>
          <span class="terminal-cursor w-2 h-4 bg-orange-accent inline-block rounded-[1px]" />
        </div>
      </div>

      <!-- Subtitle -->
      <p class="hero-fade text-lg md:text-xl mb-6 text-text-secondary" style="--delay: 0.6s;">
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Tagline -->
      <p class="hero-fade text-base md:text-lg max-w-xl mx-auto mb-10 text-text-secondary/80" style="--delay: 0.8s;">
        {{ $t('hero.tagline') }}
      </p>

      <!-- CTAs -->
      <div class="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4" style="--delay: 1s;">
        <UiOrangeButton variant="solid" @click="scrollToSection('contact')">
          <Icon name="mdi:alternate-email" class="w-5 h-5" />
          {{ $t('hero.cta_contact') }}
        </UiOrangeButton>
        <UiOrangeButton variant="outline" @click="downloadResume">
          <Icon name="mdi:download" class="w-5 h-5" />
          {{ $t('hero.cta_resume') }}
        </UiOrangeButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-fade absolute bottom-0 flex flex-col items-center gap-2" style="--delay: 1.2s;">
      <div class="w-6 h-10 rounded-full border-2 border-text-secondary/30 flex justify-center pt-6">
        <div class="w-1.5 h-1.5 rounded-full bg-orange-accent" style="animation: scroll-indicator 1.5s ease-in-out infinite;" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { scrollToSection } = useSmoothScroll()

async function downloadResume() {
  const blob = new Blob([await (await fetch('/resume.pdf')).arrayBuffer()], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  Object.assign(document.createElement('a'), { href: url, download: 'CV Pierre-Yves Guiraudet.pdf' }).click()
  URL.revokeObjectURL(url)
}
</script>

<style>
.hero-fade {
  opacity: 0;
  animation: fadeInUp 0.7s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
