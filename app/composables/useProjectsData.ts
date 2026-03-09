export interface Project {
  key: string
  techTags: string[]
  type: 'personal' | 'epitech' | 'hackathon' | 'jam'
  year: number
  current?: boolean
  github?: string
}

export function useProjectsData(): Project[] {
  return [
    {
      key: 'Those Who Listen',
      techTags: ['Nuxt', 'Python', 'PyTorch', 'OpenVoice', 'Unity', 'C#', 'Game Design'],
      type: 'epitech',
      year: 2026,
      current: true,
    },
    {
      key: 'LoCode',
      techTags: ['Nuxt', 'Vue', 'Monaco', 'Electron', 'SSH'],
      type: 'personal',
      year: 2026,
      current: true,
      github: 'https://github.com/Vierre3/LoCode',
    },
    {
      key: 'Event Horizon 5min',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      year: 2026,
      github: 'https://github.com/flav-code/game-jam-five-minutes',
    },
    {
      key: 'Glados',
      techTags: ['Haskell', 'Compiler', 'Bytecode VM'],
      type: 'epitech',
      year: 2025,
      github: 'https://github.com/Vierre3/Glados',
    },
    {
      key: 'R-Type',
      techTags: ['C++', 'SFML', 'ECS', 'Networking'],
      type: 'epitech',
      year: 2025,
      github: 'https://github.com/Vierre3/R-Type',
    },
    {
      key: 'Neural Network',
      techTags: ['Python', 'ML', 'Backpropagation'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Cryptography',
      techTags: ['Python', 'AES', 'RSA', 'PGP'],
      type: 'epitech',
      year: 2025,
    },
    {
      key: 'Gomoku',
      techTags: ['C++', 'Game AI', 'Strategy'],
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
      key: 'Zappy',
      techTags: ['C', 'C++', 'Python', 'Raylib', 'Networking'],
      type: 'epitech',
      year: 2025,
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
      techTags: ['Godot', 'GDScript', 'Game Design'],
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
