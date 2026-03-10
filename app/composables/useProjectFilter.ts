let saved = ''

export function useProjectFilter() {
  function save(filter: string) {
    saved = filter
  }

  function consume(): string {
    return saved || 'all'
  }

  return { save, consume }
}
