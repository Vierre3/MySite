<template>
  <section id="contact" class="py-24 px-4">
    <div class="max-w-3xl mx-auto">
      <UiSectionTitle title-key="nav.contact" />

      <UiScrollReveal>
        <UiGlassCard hover class="p-8 md:p-12 text-center">
          <p class="text-text-secondary text-lg mb-10">
            {{ $t('contact.subtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              :href="mailHref"
              class="flex items-center gap-3 px-6 py-4 rounded-xl bg-dark-bg/50 border border-glass-border hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 active:scale-95 md:active:scale-100 transition-all duration-300 group"
            >
              <Icon name="mdi:email-outline" class="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
              <span class="text-text-secondary group-hover:text-text-primary transition-colors">{{ $t('contact.email') }}</span>
            </a>

            <a
              href="https://github.com/Vierre3/"
              target="_self"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-6 py-4 rounded-xl bg-dark-bg/50 border border-glass-border hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 active:scale-95 md:active:scale-100 transition-all duration-300 group"
            >
              <Icon name="mdi:github" class="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
              <span class="text-text-secondary group-hover:text-text-primary transition-colors">{{ $t('contact.github') }}</span>
            </a>

            <a
              href="https://linkedin.com/in/pierreyves-guiraudet/"
              target="_self"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-6 py-4 rounded-xl bg-dark-bg/50 border border-glass-border hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:scale-105 active:scale-95 md:active:scale-100 transition-all duration-300 group"
            >
              <Icon name="mdi:linkedin" class="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
              <span class="text-text-secondary group-hover:text-text-primary transition-colors">{{ $t('contact.linkedin') }}</span>
            </a>
          </div>
        </UiGlassCard>
      </UiScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
const mailHref = ref('')
onMounted(() => {
  mailHref.value = atob('bWFpbHRvOnBpZXJyZS15dmVzLmd1aXJhdWRldEBlcGl0ZWNoLmV1')
})
</script>
