export interface ExperienceEntry {
  key: string
  current?: boolean
}

export function useExperienceData(): ExperienceEntry[] {
  return [
    // Current exchange programme first, then internships newest-first, then the
    // degree (still ongoing). Keys stay chronological (naitways = oldest).
    { key: 'rotterdam', current: true },
    { key: 'naitways3' },
    { key: 'naitways2' },
    { key: 'naitways' },
    { key: 'epitech', current: true },
  ]
}
