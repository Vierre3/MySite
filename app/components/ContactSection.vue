<template>
  <UiSection id="contact" title-key="contact.title">
    <UiScrollReveal>
      <UiGlassCard class="p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto">
        <p class="text-text-secondary text-lg text-balance mb-6">
          {{ $t('contact.subtitle') }}
        </p>

        <!-- Address is decoded on the client only, to keep it out of the static HTML -->
        <p class="min-h-8 mb-8">
          <a
            v-if="email"
            :href="`mailto:${email}`"
            class="text-sm min-[390px]:text-base sm:text-lg md:text-2xl font-semibold text-text-primary hover:text-orange-accent active:text-orange-accent transition-colors break-all"
          >
            {{ email }}
          </a>
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            v-for="link in links"
            :key="link.key"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost flex items-center gap-3 px-6 py-3 rounded-xl"
          >
            <Icon :name="link.icon" class="w-6 h-6" />
            {{ $t(`contact.${link.key}`) }}
          </a>
        </div>
      </UiGlassCard>
    </UiScrollReveal>
  </UiSection>
</template>

<script setup lang="ts">
const links = [
  { key: 'github', icon: 'mdi:github', href: 'https://github.com/Vierre3/' },
  { key: 'linkedin', icon: 'mdi:linkedin', href: 'https://www.linkedin.com/in/pierreyves-guiraudet/' },
]

const email = ref('')
onMounted(() => {
  email.value = atob('cGllcnJlLXl2ZXMuZ3VpcmF1ZGV0QGVwaXRlY2guZXU=')
})
</script>
