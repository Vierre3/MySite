<template>
  <footer class="border-t border-glass-border mt-12 py-8">
    <div class="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-text-secondary text-sm text-center sm:text-left">
        &copy; {{ new Date().getFullYear() }} Pierre-Yves • Guiraudet. {{ $t('footer.rights') }}
      </p>
      <p class="text-text-secondary/60 text-xs text-center">
        {{ $t('footer.built') }}
      </p>
    </div>
  </footer>
</template>
