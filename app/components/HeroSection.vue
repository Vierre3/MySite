<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center px-4">
    <!-- Globe background — interactive, sits behind text -->
    <div class="globe-wrap absolute inset-0 z-[5] flex items-center justify-center">
      <GlobeCanvas :size="globeSize" />
    </div>

    <div class="relative z-10 text-center max-w-3xl mx-auto pointer-events-none hero-text-readable">
      <!-- Greeting -->
      <p class="hero-fade text-lg md:text-xl mb-3 text-text-secondary">
        {{ $t('hero.greeting') }}
      </p>

      <!-- Name -->
      <h1 class="hero-fade text-5xl md:text-7xl font-bold mb-4 text-text-primary" style="--delay: 0.2s;">
        {{ $t('hero.name') }}
      </h1>

      <!-- Title -->
      <div class="hero-fade flex items-center justify-center gap-3 mb-3" style="--delay: 0.4s;">
        <span class="text-xl md:text-2xl font-semibold text-orange-accent">
          {{ $t('hero.title') }}
        </span>
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
      <div class="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto" style="--delay: 1s;">
        <UiOrangeButton variant="solid" @click="scrollToSection('contact')">
          <Icon name="mdi:alternate-email" class="w-5 h-5" />
          {{ $t('hero.cta_contact') }}
        </UiOrangeButton>
        <UiOrangeButton variant="outline" class="hero-btn-outline" @click="downloadResume">
          <Icon name="mdi:download" class="w-5 h-5" />
          {{ $t('hero.cta_resume') }}
        </UiOrangeButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-fade absolute bottom-10 flex flex-col items-center gap-2" style="--delay: 1.2s;">
      <div class="w-6 h-10 rounded-full border-2 border-text-secondary/30 flex justify-center pt-6">
        <div class="w-1.5 h-1.5 rounded-full bg-orange-accent" style="animation: scroll-indicator 1.5s ease-in-out infinite;" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { scrollToSection } = useSmoothScroll()

const globeSize = computed(() => {
  if (import.meta.server) return 550
  return window.innerWidth < 768 ? 350 : 550
})

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

/* Background-colored halo behind text so it reads clearly over the globe */
.hero-text-readable p,
.hero-text-readable h1,
.hero-text-readable span {
  text-shadow:
    0 0 8px var(--hero-halo),
    0 0 16px var(--hero-halo),
    0 0 30px var(--hero-halo),
    0 0 30px var(--hero-halo),
    0 0 60px var(--hero-halo);
  transition: text-shadow 300ms ease;
}

/* Outline button: add halo but preserve its transition-all for hover effects */
.hero-text-readable .hero-btn-outline {
  text-shadow:
    0 0 8px var(--hero-halo),
    0 0 16px var(--hero-halo),
    0 0 30px var(--hero-halo),
    0 0 30px var(--hero-halo),
    0 0 60px var(--hero-halo);
}

/* Icons use drop-shadow (text-shadow doesn't work on SVGs) */
.hero-text-readable svg {
  filter:
    drop-shadow(0 0 6px var(--hero-halo))
    drop-shadow(0 0 14px var(--hero-halo))
    drop-shadow(0 0 28px var(--hero-halo));
  transition: filter 300ms ease;
}

.dark { --hero-halo: rgb(10 10 26); }
.light { --hero-halo: rgb(245 245 247); }
</style>
