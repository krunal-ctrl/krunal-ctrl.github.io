import { SkillCategory } from './skills.model';

/** Grouped per resume.md's categorization, replacing the old About page's flat tag cloud. */
export const SKILLS: SkillCategory[] = [
  { category: 'Languages', skills: ['C#', 'TypeScript', 'Python', 'SQL', 'Java', 'HTML/CSS'] },
  { category: 'Frameworks', skills: ['.NET (Web API, Blazor, EF Core)', 'Angular (v7–v19)', 'Flask', 'Node.js'] },
  { category: 'Cloud & DevOps', skills: ['AWS (SQS, SNS, S3, Lambda)', 'Azure (AZ-900)', 'Google Cloud Platform', 'Cloudflare CDN', 'Docker', 'Linux'] },
  { category: 'Architecture', skills: ['Microservices', 'CQRS', 'Clean/Onion/Layered Architecture', 'Mediator Pattern', 'REST', 'WebSocket'] },
  { category: 'Auth & Security', skills: ['Firebase Auth', 'JWT', 'RBAC', 'MFA', 'Private Key Infrastructure'] },
  { category: 'Databases', skills: ['SQL Server', 'MongoDB', 'Entity Framework Core', 'Dapper'] },
  { category: 'Tools', skills: ['Git', 'Visual Studio', 'VS Code', 'JetBrains IDEs', 'Postman'] },
  { category: 'Methodologies', skills: ['Agile/Scrum', 'TDD', 'Code Review', 'Technical Mentorship'] },
];
