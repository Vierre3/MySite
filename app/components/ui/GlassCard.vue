<template>
  <div class="relative rounded-2xl border-[0.75px] border-glass-border h-full transition-all duration-300 translate-y-0 hover:-translate-y-1">
    <UiGlowingEffect
      v-if="hover"
      :spread="30"
      :glow="true"
      :disabled="false"
      :proximity="50"
      :inactive-zone="0"
      :border-width="2"
    />
    <div
      class="relative h-full backdrop-blur-xl bg-glass rounded-[inherit] transition-all duration-300"
      :class="[
        hover && ' hover:bg-glass-hover hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]',
        $attrs.class as string
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{
  hover?: boolean
}>()
</script>
