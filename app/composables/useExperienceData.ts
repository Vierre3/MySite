export interface ExperienceEntry {
  key: string
}

export function useExperienceData(): ExperienceEntry[] {
  return [
    { key: 'naitways1' },
    { key: 'naitways2' },
  ]
}
