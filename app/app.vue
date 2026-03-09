<template>
  <div
    class="min-h-screen bg-dark-bg text-text-primary font-sans antialiased transition-[background-color,color] duration-300"
    :class="{ 'skip-animations': isRestoring }"
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

const { theme } = useTheme()
useHead({
  htmlAttrs: {
    class: computed(() => theme.value === 'light' ? 'light' : ''),
  },
})
</script>

<style>
@import '~/assets/css/animations.css';

:root {
  --orange-accent: 255 107 0;
  --orange-light: 255 138 51;
  --orange-dark: 204 85 0;
  --orange-glow: rgba(255, 107, 0, 0.3);
  --orange-glow-strong: rgba(255, 107, 0, 0.5);
  --glass: rgba(255, 255, 255, 0.05);
  --glass-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-hover: rgba(255, 255, 255, 0.18);
  --dark-bg: 10 10 26;
  --dark-surface: 17 17 39;
  --dark-card: 22 22 46;
  --text-primary: 240 240 245;
  --text-secondary: 160 160 184;
}

.light {
  --orange-accent: 229 90 0;
  --orange-light: 255 138 51;
  --orange-dark: 204 85 0;
  --orange-glow: rgba(255, 107, 0, 0.15);
  --orange-glow-strong: rgba(255, 107, 0, 0.25);
  --glass: rgba(0, 0, 0, 0.03);
  --glass-hover: rgba(0, 0, 0, 0.06);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-border-hover: rgba(0, 0, 0, 0.18);
  --dark-bg: 245 245 247;
  --dark-surface: 232 232 239;
  --dark-card: 221 221 232;
  --text-primary: 26 26 46;
  --text-secondary: 85 85 112;
}

html {
  background-color: rgb(var(--dark-bg));
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
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.skip-animations nav {
  transition: none !important;
}
</style>
