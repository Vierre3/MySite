export interface Project {
  key: string
  techTags: string[]
  type: 'personal' | 'epitech' | 'rotterdam' | 'hackathon' | 'jam'
  year: number
  current?: boolean
  featured?: boolean
  github?: string
  liveUrl?: string
  playUrl?: string
}

export function useProjectsData(): Project[] {
  return [
    {
      key: 'Those Who Listen',
      techTags: ['Nuxt', 'Python', 'PyTorch', 'OpenVoice', 'Unity', 'C#'],
      type: 'epitech',
      year: 2026,
      current: true,
      featured: true,
    },
    {
      key: 'LoCode',
      techTags: ['Nuxt', 'Vue', 'Monaco', 'Electron', 'SSH'],
      type: 'personal',
      year: 2026,
      current: true,
      featured: true,
      github: 'https://github.com/Vierre3/LoCode',
      playUrl: 'https://locode.vierre3.dev/',
    },
    {
      key: 'Fortunes of 1877',
      techTags: ['Unity', 'C#', 'Inverse Kinematics', 'Physics', '3D'],
      type: 'rotterdam',
      year: 2026,
      current: true,
      liveUrl: 'https://fortunesof1877.com/',
    },
    {
      key: 'Safekeeping',
      techTags: ['Unity', 'C#', 'A* Pathfinding', 'WebGL', 'Android'],
      type: 'rotterdam',
      year: 2026,
      featured: true,
      liveUrl: 'https://safekeeping.vierre3.dev/',
      playUrl: 'https://safekeeping.vierre3.dev/play/',
    },
    {
      key: 'Copaintes',
      techTags: ['Nuxt', 'Vue', 'Static site', 'Responsive'],
      type: 'personal',
      year: 2026,
      liveUrl: 'https://copaintes.com/',
    },
    {
      key: 'Portfolio',
      techTags: ['Nuxt', 'Vue', 'Tailwind CSS', 'i18n', 'Canvas'],
      type: 'personal',
      year: 2026,
      github: 'https://github.com/Vierre3/MySite/',
    },
    {
      key: 'Event Horizon 5min',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      year: 2026,
      github: 'https://github.com/flav-code/game-jam-five-minutes',
    },
    {
      key: 'R-Type',
      techTags: ['C++', 'SFML', 'ECS', 'Networking'],
      type: 'epitech',
      year: 2025,
      featured: true,
      github: 'https://github.com/Vierre3/R-Type',
    },
    {
      key: 'Gomoku',
      techTags: ['C++', 'Game AI', 'Strategy'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Neural Network',
      techTags: ['Python', 'ML', 'Backpropagation'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Glados',
      techTags: ['Haskell', 'Compiler', 'Bytecode VM'],
      type: 'epitech',
      year: 2025,
      featured: true,
      github: 'https://github.com/Vierre3/Glados',
    },
    {
      key: 'Cryptography',
      techTags: ['Python', 'AES', 'RSA', 'PGP'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Zappy',
      techTags: ['C', 'C++', 'Python', 'Raylib', 'Networking'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Lost In Space',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      year: 2025,
      github: 'https://github.com/azeloup/LostInSpace',
    },
    {
      key: 'Raytracer',
      techTags: ['C++', 'CMake', 'CUDA', '3D Graphics'],
      type: 'epitech',
      year: 2025,
      github: 'https://github.com/azeloup/raytracer',
    },
    {
      key: 'Arcade',
      techTags: ['C++', 'Plugins', 'Dynamic Loading'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'My Marvin',
      techTags: ['Jenkins', 'Groovy', 'Docker', 'CI/CD'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'JEB Incubator',
      techTags: ['Nuxt', 'Vue', 'Deno', 'MongoDB', 'Docker'],
      type: 'epitech',
      year: 2025,
      featured: true,
      github: 'https://github.com/BjrTom/Survivor-JEB/tree/dev',
    },
    {
      key: 'Vueling AI',
      techTags: ['Node.js', 'Nuxt', 'AI', 'Real-time'],
      type: 'hackathon',
      year: 2025,
      github: 'https://github.com/AxiomePro/vueling-hackathon-ai',
    },
    {
      key: 'IREP ChatBot',
      techTags: ['Python', 'Flask', 'Ollama', 'SQLite'],
      type: 'hackathon',
      year: 2025,
    },
    {
      key: '42sh',
      techTags: ['C', 'UNIX', 'Parsing', 'System Programming'],
      type: 'epitech',
      year: 2024,
      github: 'https://github.com/Vierre3/42sh',
    },
    {
      key: 'RPG',
      techTags: ['C', 'CSFML', '2D Game', 'Sprites'],
      type: 'epitech',
      year: 2024,
      github: 'https://github.com/AxiomePro/MyRPG',
    },
    {
      key: 'Flame Your Mind',
      techTags: ['Godot', 'Unreal Engine 5', 'GDScript', 'Game Design'],
      type: 'jam',
      year: 2024,
      github: 'https://github.com/AxiomePro/FlameYourMind',
    },
    {
      key: 'Robbers & Cat',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      year: 2024,
      github: 'https://github.com/AxiomePro/RobbersAndCat',
    },
  ]
}
