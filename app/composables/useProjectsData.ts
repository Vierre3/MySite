export interface Project {
  key: string
  techTags: string[]
  type: 'personal' | 'epitech' | 'hackathon' | 'jam'
  current?: boolean
  github?: string
}

export function useProjectsData(): Project[] {
  return [
    {
      key: 'Those Who Listen',
      techTags: ['Nuxt', 'Python', 'PyTorch', 'OpenVoice', 'Unity', 'C#', 'Game Design'],
      type: 'epitech',
      current: true,
    },
    {
      key: 'LoCode',
      techTags: ['Nuxt', 'Vue', 'Monaco', 'Electron', 'SSH'],
      type: 'personal',
      current: true,
      github: 'https://github.com/Vierre3/LoCode',
    },
    {
      key: 'Glados',
      techTags: ['Haskell', 'Compiler', 'Bytecode VM'],
      type: 'epitech',
      github: 'https://github.com/Vierre3/Glados',
    },
    {
      key: 'R-Type',
      techTags: ['C++', 'SFML', 'ECS', 'Networking'],
      type: 'epitech',
      github: 'https://github.com/Vierre3/R-Type',
    },
    {
      key: 'Zappy',
      techTags: ['C', 'C++', 'Python', 'Raylib', 'Networking'],
      type: 'epitech',
    },
    {
      key: '42sh',
      techTags: ['C', 'UNIX', 'Parsing', 'System Programming'],
      type: 'epitech',
      github: 'https://github.com/Vierre3/42sh',
    },
    {
      key: 'Arcade',
      techTags: ['C++', 'Plugins', 'Dynamic Loading'],
      type: 'epitech',
    },
    {
      key: 'Raytracer',
      techTags: ['C++', 'CMake', 'CUDA', '3D Graphics'],
      type: 'epitech',
      github: 'https://github.com/azeloup/raytracer',
    },
    {
      key: 'Cryptography',
      techTags: ['Python', 'AES', 'RSA', 'PGP'],
      type: 'epitech',
    },
    {
      key: 'Neural Network',
      techTags: ['Python', 'ML', 'Backpropagation'],
      type: 'epitech',
    },
    {
      key: 'JEB Incubator',
      techTags: ['Nuxt', 'Vue', 'Deno', 'MongoDB', 'Docker'],
      type: 'epitech',
      github: 'https://github.com/BjrTom/Survivor-JEB/tree/dev',
    },
    {
      key: 'Gomoku',
      techTags: ['C++', 'Game AI', 'Strategy'],
      type: 'epitech',
    },
    {
      key: 'RPG',
      techTags: ['C', 'CSFML', '2D Game', 'Sprites'],
      type: 'epitech',
    },
    {
      key: 'My Marvin',
      techTags: ['Jenkins', 'Groovy', 'Docker', 'CI/CD'],
      type: 'epitech',
    },
    {
      key: 'Vueling AI',
      techTags: ['Node.js', 'Nuxt', 'AI', 'Real-time'],
      type: 'hackathon',
    },
    {
      key: 'IREP ChatBot',
      techTags: ['Python', 'Flask', 'Ollama', 'SQLite'],
      type: 'hackathon',
    },
    {
      key: 'Flame Your Mind',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'Event Horizon 5min',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      github: 'https://github.com/flav-code/game-jam-five-minutes',
    },
    {
      key: 'Lost In Space',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
      github: 'https://github.com/azeloup/LostInSpace',
    },
    {
      key: 'Robbers & Cat',
      techTags: ['Godot', 'GDScript', 'Game Design'],
      type: 'jam',
    },
  ]
}
