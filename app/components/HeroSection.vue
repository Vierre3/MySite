<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center px-4">
    <HeroBackground />

    <div class="relative z-10 text-center max-w-3xl mx-auto">
      <!-- Greeting -->
      <p class="hero-fade text-lg md:text-xl mb-3" style="--delay: 0.2s; color: #a0a0b8;">
        {{ $t('hero.greeting') }}
      </p>

      <!-- Name -->
      <h1 class="hero-fade text-5xl md:text-7xl font-bold mb-4" style="--delay: 0.4s; color: #f0f0f5;">
        {{ $t('hero.name') }}
      </h1>

      <!-- Title -->
      <div class="hero-fade flex items-center justify-center gap-3 mb-3" style="--delay: 0.6s;">
        <span class="text-xl md:text-2xl font-semibold" style="color: #FF6B00;">
          {{ $t('hero.title') }}
        </span>
      </div>

      <!-- Subtitle -->
      <p class="hero-fade text-lg mb-6" style="--delay: 0.7s; color: #a0a0b8;">
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Tagline -->
      <p class="hero-fade text-base md:text-lg max-w-xl mx-auto mb-10" style="--delay: 0.8s; color: rgba(160, 160, 184, 0.8);">
        {{ $t('hero.tagline') }}
      </p>

      <!-- CTAs -->
      <div class="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4" style="--delay: 1s;">
        <UiOrangeButton variant="solid" @click="scrollToSection('contact')">
          <Icon name="mdi:alternate-email" class="w-5 h-5" />
          {{ $t('hero.cta_contact') }}
        </UiOrangeButton>
        <UiOrangeButton variant="outline" href="/resume.pdf" download="CV_Pierre-Yves_Guiraudet.pdf">
          <Icon name="mdi:download" class="w-5 h-5" />
          {{ $t('hero.cta_resume') }}
        </UiOrangeButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-fade absolute bottom-10 flex flex-col items-center gap-2" style="--delay: 1.2s;">
      <div class="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style="border-color: rgba(160, 160, 184, 0.3);">
        <div class="w-1.5 h-1.5 rounded-full" style="background-color: #FF6B00; animation: scroll-indicator 1.5s ease-in-out infinite;" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { scrollToSection } = useSmoothScroll()
</script>

<style>
.hero-fade {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
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
