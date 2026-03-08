<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden" style="z-index: 0;">
    <!-- Gradient orbs - responsive sizes, visible on all screens -->
    <div
      class="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full blur-[80px] md:blur-[120px]"
      style="background: radial-gradient(circle, #FF6B00 0%, transparent 70%); top: -10%; right: -15%; opacity: 0.4; animation: float-slow 8s ease-in-out infinite;"
    />
    <div
      class="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full blur-[70px] md:blur-[100px]"
      style="background: radial-gradient(circle, #FF8A33 0%, transparent 70%); bottom: 5%; left: -10%; opacity: 0.3; animation: float 10s ease-in-out infinite;"
    />
    <div
      class="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[60px] md:blur-[80px]"
      style="background: radial-gradient(circle, #4a3aff 0%, transparent 70%); top: 35%; left: 45%; opacity: 0.18; animation: float-slow 12s ease-in-out infinite reverse;"
    />
    <div
      class="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] rounded-full blur-[70px] md:blur-[90px]"
      style="background: radial-gradient(circle, #FF6B00 0%, transparent 70%); top: 60%; right: 10%; opacity: 0.18; animation: float 14s ease-in-out infinite;"
    />

    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0"
      style="opacity: 0.04; background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"
    />

    <!-- Floating geometric shapes -->
    <div
      v-for="shape in shapes"
      :key="shape.id"
      class="absolute"
      :class="[shape.class, shape.hideOnMobile ? 'hidden sm:block' : '']"
      :style="shape.style"
    />
  </div>
</template>

<script setup lang="ts">
const shapes = [
  // Diamonds (rotated squares)
  { id: 1, class: 'w-2 h-2 rotate-45', style: 'background-color: rgba(255,107,0,0.35); top: 45%; left: 8%; animation: float 7s ease-in-out infinite reverse;', hideOnMobile: false },
  { id: 2, class: 'w-5 h-5 border rotate-45', style: 'border-color: rgba(255,107,0,0.2); top: 65%; right: 25%; animation: float-slow 9s ease-in-out infinite;', hideOnMobile: true },
  { id: 3, class: 'w-2 h-2 rotate-45', style: 'background-color: rgba(255,107,0,0.3); top: 85%; left: 20%; animation: float 5s ease-in-out infinite;', hideOnMobile: false },

  // Circles (filled)
  { id: 4, class: 'w-3 h-3 rounded-full', style: 'background-color: rgba(255,107,0,0.3); top: 15%; right: 30%; animation: float-slow 7s ease-in-out infinite;', hideOnMobile: false },
  { id: 5, class: 'w-2 h-2 rounded-full', style: 'background-color: rgba(255,107,0,0.25); top: 35%; left: 25%; animation: float 6s ease-in-out infinite reverse;', hideOnMobile: false },
  { id: 6, class: 'w-1.5 h-1.5 rounded-full', style: 'background-color: rgba(255,107,0,0.4); top: 50%; right: 12%; animation: float-slow 5s ease-in-out infinite;', hideOnMobile: false },

  // Circle outlines
  { id: 7, class: 'w-5 h-5 border rounded-full', style: 'border-color: rgba(255,107,0,0.2); top: 80%; left: 60%; animation: float 7s ease-in-out infinite;', hideOnMobile: true },
  { id: 8, class: 'w-4 h-4 border rounded-full', style: 'border-color: rgba(255,107,0,0.3); top: 10%; left: 55%; animation: float-slow 8s ease-in-out infinite reverse;', hideOnMobile: true },

  // Tiny dots
  { id: 9, class: 'w-1 h-1 rounded-full', style: 'background-color: rgba(255,107,0,0.5); top: 18%; left: 35%; animation: float 4s ease-in-out infinite;', hideOnMobile: false },
  { id: 10, class: 'w-1 h-1 rounded-full', style: 'background-color: rgba(255,107,0,0.4); top: 42%; right: 45%; animation: float-slow 5s ease-in-out infinite;', hideOnMobile: false },

  // Extra diamonds scattered
  { id: 11, class: 'w-3 h-3 border rotate-45', style: 'border-color: rgba(255,107,0,0.25); top: 38%; right: 5%; animation: float 10s ease-in-out infinite;', hideOnMobile: true },
  { id: 12, class: 'w-2 h-2 rotate-45', style: 'background-color: rgba(255,107,0,0.2); top: 72%; right: 50%; animation: float-slow 7s ease-in-out infinite reverse;', hideOnMobile: false },
]
</script>
