<template>
  <div
    class="min-h-screen bg-dark-bg text-text-primary font-sans antialiased"
    :class="{ 'skip-animations': isRestoring }"
    style="color: #f0f0f5; background-color: #0a0a1a;"
  >
    <NavBar />
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const { isRestoring } = useScrollRestore()
setupScrollRestore()
</script>

<style>
@import '~/assets/css/animations.css';

html {
  background-color: #0a0a1a;
}

body {
  overflow-x: hidden;
}

/* When restoring scroll position, skip all entrance animations */
.skip-animations .hero-fade {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}

.skip-animations .scroll-reveal {
  clip-path: none !important;
  transform: none !important;
  transition: none !important;
}

.skip-animations nav {
  transition: none !important;
}
</style>
