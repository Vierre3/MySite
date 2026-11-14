<template>
  <section id="hero" class="relative min-h-[calc(100svh-3rem)] flex items-center px-4 py-24">
    <div class="hero-content max-w-5xl mx-auto w-full">
      <p class="hero-fade text-lg font-medium text-orange-accent mb-4">
        {{ $t('hero.role') }}
      </p>

      <h1 class="hero-fade text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-text-primary mb-6" style="--delay: 140ms;">
        {{ $t('hero.name') }}
      </h1>

      <p class="hero-fade text-xl md:text-2xl text-balance text-text-primary max-w-3xl mb-4" style="--delay: 280ms;">
        {{ $t('hero.statement') }}
      </p>

      <p class="hero-fade text-base md:text-lg text-pretty text-text-secondary max-w-xl mb-10" style="--delay: 420ms;">
        {{ $t('hero.context') }}
      </p>

      <div class="hero-fade flex flex-col sm:flex-row items-start sm:items-center gap-4" style="--delay: 560ms;">
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
/* Arriving: each line fades in and settles, one after the other. The fade has
   its own gentle curve and enough time to be seen; with a single fast curve for
   both, the text was nearly opaque within the first instant and the entrance
   went unnoticed. */
.hero-fade {
  animation:
    heroFade 0.9s ease-out both,
    heroRise 1s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-delay: var(--delay, 0s);
}

@keyframes heroFade {
  from { opacity: 0; }
}
@keyframes heroRise {
  from { transform: translateY(18px); }
}

/* Leaving: the hero text fades and lifts slightly as the first screen scrolls
   away. Decorative, so browsers without scroll-driven animations skip it. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) and (animation-range: 0px 100vh) {
    .hero-content {
      animation: hero-leave linear both;
      animation-timeline: scroll(root);
      animation-range: 10vh 70vh;
    }
  }
}

@keyframes hero-leave {
  to { opacity: 0; transform: translateY(-2rem); }
}
</style>
