export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const match = document.cookie.match(/(?:^|;\s*)locale=(\w+)/)
    const saved = match?.[1]
    if (saved && saved !== nuxtApp.$i18n.locale.value) {
      nuxtApp.$i18n.setLocale(saved)
    }
  })
})
