export interface ExperienceEntry {
  key: string
  current?: boolean
}

export function useExperienceData(): ExperienceEntry[] {
  return [
    { key: 'epitech', current: true },
    { key: 'naitways1' },
    { key: 'naitways2' },
  ]
}
