<template>
  <div class="site-bg" aria-hidden="true">
    <HeroVisual />
  </div>
</template>

<style>
/* Backdrop: the plain page colour with a faint grid, and the ribbon. No colour
   washes: colour lives in the ribbon and in the content. */
.site-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgb(var(--opposite) / 0.03) 1px, transparent 1px) 0 0 / 60px 60px,
    linear-gradient(90deg, rgb(var(--opposite) / 0.03) 1px, transparent 1px) 0 0 / 60px 60px;
}

/* Parallax: the layer always moves at 15% of the scroll speed, however long the
   page is. It is laid out in the page (absolute, so it would scroll away at full
   speed) and a scroll-driven animation pushes it back down by 85% of the
   distance scrolled. Its height is exactly what that leaves visible:
   one screen + 15% of the scrollable distance = 15% of the page + 85vh.
   The end offset, (page - screen) * 0.85, written in terms of the layer's own
   height (the % in translate) is (100% - 100vh) * 0.85 / 0.15.
   Decorative, so browsers without scroll-driven animations keep it fixed. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    .site-bg {
      position: absolute;
      inset: 0 0 auto;
      height: calc(15% + 85vh);
      animation: site-bg-drift linear both;
      animation-timeline: scroll(root);
    }
  }
}

@keyframes site-bg-drift {
  to { transform: translateY(calc((100% - 100vh) * 0.85 / 0.15)); }
}
</style>
