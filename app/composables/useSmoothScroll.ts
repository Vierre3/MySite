export function useSmoothScroll() {
  function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return { scrollToSection }
}
