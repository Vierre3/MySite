<template>
  <footer class="border-t border-glass-border py-8">
    <div class="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-text-secondary text-sm">
        &copy; {{ new Date().getFullYear() }} Pierre-Yves • Guiraudet. {{ $t('footer.rights') }}
      </p>
      <p class="text-text-secondary/60 text-xs">
        {{ $t('footer.built') }}
      </p>
    </div>
  </footer>
</template>
