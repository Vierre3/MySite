<template>
  <div class="min-h-screen bg-dark-bg text-text-primary font-sans antialiased" style="color: #f0f0f5; background-color: #0a0a1a;">
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

<style>
@import '~/assets/css/animations.css';

html {
  background-color: #0a0a1a;
}

body {
  overflow-x: hidden;
}
</style>
