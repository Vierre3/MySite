<template>
  <div class="site-bg" aria-hidden="true">
    <HeroVisual />
  </div>
</template>

<style>
/* Backdrop: soft colour washes and a faint grid, painted as gradients (no blur
   filter). Wash sizes are tied to the screen width, not to the layer: the layer
   is several screens tall, and circles sized from it would be wider than a
   phone screen and tint the whole view one flat colour. */
.site-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgb(var(--opposite) / 0.025) 1px, transparent 1px) 0 0 / 60px 60px,
    linear-gradient(90deg, rgb(var(--opposite) / 0.025) 1px, transparent 1px) 0 0 / 60px 60px,
    radial-gradient(circle 95vw at 100% 0%, rgb(var(--orange-accent) / 0.22), transparent),
    radial-gradient(circle 85vw at 0% 20%, rgb(var(--orange-light) / 0.15), transparent),
    radial-gradient(circle 80vw at 70% 40%, rgb(74 58 255 / 0.11), transparent),
    radial-gradient(circle 85vw at 100% 58%, rgb(var(--orange-accent) / 0.16), transparent),
    radial-gradient(circle 85vw at 0% 79%, rgb(var(--orange-light) / 0.15), transparent),
    radial-gradient(circle 90vw at 100% 100%, rgb(var(--orange-accent) / 0.18), transparent);
}

/* Wide screens: fewer, larger washes */
@media (min-width: 1024px) {
  .site-bg {
    background:
      linear-gradient(rgb(var(--opposite) / 0.025) 1px, transparent 1px) 0 0 / 60px 60px,
      linear-gradient(90deg, rgb(var(--opposite) / 0.025) 1px, transparent 1px) 0 0 / 60px 60px,
      radial-gradient(circle at 100% 0%, rgb(var(--orange-accent) / 0.2), transparent 45%),
      radial-gradient(circle at 0% 95%, rgb(var(--orange-light) / 0.14), transparent 40%),
      radial-gradient(circle at 55% 45%, rgb(74 58 255 / 0.09), transparent 35%),
      radial-gradient(circle at 88% 70%, rgb(var(--orange-accent) / 0.08), transparent 30%);
  }
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
