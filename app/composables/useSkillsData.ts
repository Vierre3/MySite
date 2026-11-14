export interface SkillGroup {
  key: string
  items: string[]
}

// Group labels live in the locale files under `skills.<key>`.
export function useSkillsData(): SkillGroup[] {
  return [
    { key: 'languages', items: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'C#', 'Haskell', 'Rust', 'Groovy'] },
    { key: 'frontend', items: ['Vue.js', 'Nuxt', 'Pinia', 'Tailwind CSS', 'Electron'] },
    { key: 'backend', items: ['FastAPI', 'Flask', 'Node.js', 'Deno', 'SQLAlchemy', 'PostgreSQL', 'MongoDB', 'SQLite', 'InfluxDB', 'RabbitMQ', 'Keycloak'] },
    { key: 'infra', items: ['Linux', 'Docker', 'KVM / libvirt', 'Open vSwitch', 'GitLab CI', 'GitHub Actions', 'Jenkins', 'Git'] },
    { key: 'creative', items: ['Unity', 'Godot', 'Blender', 'SFML', 'Raylib'] },
    { key: 'domains', items: ['Networking', 'Virtualization', 'Cryptography', 'AI / ML'] },
  ]
}
