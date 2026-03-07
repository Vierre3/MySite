<template>
  <div class="absolute inset-0 overflow-hidden">
    <!-- Gradient orbs -->
    <div
      class="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
      style="background: radial-gradient(circle, #FF6B00 0%, transparent 70%); top: -10%; right: -10%; animation: float-slow 8s ease-in-out infinite;"
    />
    <div
      class="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
      style="background: radial-gradient(circle, #FF8A33 0%, transparent 70%); bottom: -15%; left: -5%; animation: float 10s ease-in-out infinite;"
    />
    <div
      class="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
      style="background: radial-gradient(circle, #4a3aff 0%, transparent 70%); top: 40%; left: 50%; animation: float-slow 12s ease-in-out infinite reverse;"
    />

    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"
    />

    <!-- Floating geometric shapes -->
    <div
      class="absolute w-4 h-4 border border-orange-accent/30 rotate-45"
      style="top: 20%; left: 15%; animation: float 6s ease-in-out infinite;"
    />
    <div
      class="absolute w-3 h-3 bg-orange-accent/20 rounded-full"
      style="top: 60%; right: 20%; animation: float-slow 7s ease-in-out infinite;"
    />
    <div
      class="absolute w-6 h-6 border border-orange-accent/20 rounded-full"
      style="bottom: 30%; left: 30%; animation: float 9s ease-in-out infinite reverse;"
    />
    <div
      class="absolute w-2 h-2 bg-orange-accent/30 rotate-45"
      style="top: 35%; right: 35%; animation: float-slow 5s ease-in-out infinite;"
    />
  </div>
</template>
