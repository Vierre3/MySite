import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior() {
    // Scroll is managed by useScrollRestore, not the router
    return false
  },
}
