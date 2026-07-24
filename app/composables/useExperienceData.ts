export interface ExperienceEntry {
  key: string
  current?: boolean
}

export function useExperienceData(): ExperienceEntry[] {
  return [
    // Epitech pinned first (finishes last, still ongoing), then the internships
    // newest-first. Keys stay chronological (naitways = oldest); only the
    // displayed order is reversed.
    { key: 'epitech', current: true },
    { key: 'naitways3', current: true },
    { key: 'naitways2' },
    { key: 'naitways' },
  ]
}
