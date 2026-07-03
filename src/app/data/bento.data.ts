import { BentoTile } from './bento.model';

export const BENTO_TILES: BentoTile[] = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    description: '.NET Web API, EF Core, Blazor and clean architecture - built around CQRS, the mediator pattern, and dependency injection.',
    tags: ['C#', '.NET', 'EF Core', 'Dapper'],
    eyebrow: 'Core strength',
    feature: true,
    illustration: 'backend',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Angular from v7 to v19 - including a full legacy migration. Accessible UIs with careful state management.',
    tags: ['Angular', 'TypeScript'],
    illustration: 'frontend',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Distributed systems on AWS & Azure, fronted by Cloudflare CDN and containerised with Docker.',
    emoji: '☁️',
  },
  {
    id: 'arch',
    title: 'Architecture',
    description: 'Microservices, clean/onion/layered designs, REST and WebSocket - structured so teams can move fast without breaking things.',
    tags: ['Microservices', 'CQRS', 'REST'],
    illustration: 'arch',
  },
  {
    id: 'auth',
    title: 'Auth & Security',
    description: 'Firebase Auth, JWT, RBAC, MFA and private-key infrastructure.',
    emoji: '🔐',
  },
  {
    id: 'mentor',
    title: 'Mentorship',
    description: 'Code review, TDD coaching and running company-wide hackathons - lifting whole teams, not just my own output.',
    tags: ['Agile', 'TDD', 'Code review'],
    emoji: '🧭',
  },
];
