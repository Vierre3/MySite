// On iOS, the CSS `:active` state only fires on touch if a touch listener
// exists on the document. Register an empty passive one so that the `active:`
// utilities (which replace hover as touch feedback) actually trigger on tap.
export default defineNuxtPlugin(() => {
  document.addEventListener('touchstart', () => {}, { passive: true })
})
