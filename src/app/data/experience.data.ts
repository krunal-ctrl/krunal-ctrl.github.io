import { Experience } from './experience.model';

/**
 * Canonical experience data. Dates/locations resolved in favor of resume.md and about.html
 * where the old site's index.html brief timeline disagreed (Senior Software Engineer's dates,
 * and "Rajkot, India" vs "Rajkot, Gujarat").
 */
export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Decos',
    companyUrl: 'https://decos.com/en',
    dateRange: 'May 2025 – Present',
    location: 'Remote (global clients)',
    bullets: [
      'Leading an Angular 7 → 19 migration of a large legacy application with a cross-functional international team across time zones.',
      'Reduced component-level bugs ~70% and eliminated 3–4s of load time per interaction by preventing unnecessary Blazor re-renders and redundant API calls.',
      'Optimised Blazor module performance up to 50% on CenterOne ProcessPro, a globally-used document-management system.',
      'Migrated the data-access layer from raw Dapper SQL to Entity Framework Core for long-term maintainability.',
    ],
    briefBullets: [
      'Leading an Angular 7 → 19 migration of a large legacy application with an international team.',
      'Cut component bugs ~70% and trimmed 3–4s of load time by taming Blazor re-renders on a global document-management platform.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Tark Technologies',
    companyUrl: 'https://tarktech.com/',
    dateRange: 'Apr 2024 – 2025',
    location: 'Rajkot, Gujarat',
    bullets: [
      'Mentored 7–10 junior developers and interns in code review, architecture and TDD.',
      'Organised company-wide hackathons and tech events with 50–100 attendees.',
      'Architected a secure auth system using Firebase and private-key infrastructure with RBAC and MFA.',
      'Designed a real-time WebSocket messaging system for mobile field operations, with queuing and offline handling.',
    ],
    briefBullets: [
      'Mentored 7–10 engineers and ran hackathons for 50–100 attendees.',
      'Built secure auth (Firebase + RBAC + MFA) and a real-time WebSocket messaging system for field operations.',
    ],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Tark Technologies',
    companyUrl: 'https://tarktech.com/',
    dateRange: 'Jul 2022 – Apr 2024',
    location: 'Rajkot, Gujarat',
    bullets: [
      'Engineered RESTful APIs across .NET microservices, with caching and rate limiting for performance.',
      'Led a refactor introducing CQRS and automated testing pipelines for better quality and reliable deployments.',
      'Designed distributed architecture on AWS (SQS, SNS, S3) and Cloudflare CDN for multi-location reliability.',
      'Built custom HomeSeer automation plugins integrating with POS systems and real-time hardware monitoring.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Tark Technologies',
    companyUrl: 'https://tarktech.com/',
    dateRange: 'Sep 2021 – Jun 2022',
    location: 'Rajkot, Gujarat',
    bullets: [
      'Built an airline reservation system with .NET Web API and Angular, using a graph search algorithm for connecting flights and one-way / round-trip / multi-city options.',
    ],
  },
];
