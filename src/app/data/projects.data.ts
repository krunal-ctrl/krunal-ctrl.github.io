import { Project } from './projects.model';

/** Full project list shown on the Projects page, in the original card order. */
export const PROJECTS: Project[] = [
  {
    title: 'Restaurant POS System',
    description:
      'A multi-location restaurant POS on .NET microservices and Angular - real-time order tracking, inventory, and a dynamic digital-menu engine with configurable stock and pricing rules. Includes a custom stack-based receipt-template interpreter and a graph-based validator that prevents circular menu-screen dependencies.',
    tags: ['.NET Microservices', 'Angular', 'AWS', 'Cloudflare'],
    wide: true,
    artId: 'restaurant-pos',
  },
  {
    title: 'Printer Management Dashboard',
    description:
      'A real-time printer monitoring system integrated with the Windows print spooler - job-queue management, automated cleanup of stale jobs, and comprehensive error tracking.',
    tags: ['.NET', 'Angular'],
    icon: '🖨️',
  },
  {
    title: 'Online Food Ordering Platform',
    description:
      'A responsive ordering platform with real-time order tracking, dynamic menu management and a kitchen-notification system. Secure Firebase auth with custom claims and private-key auth between microservices, plus Google Pay and Apple Pay integration.',
    tags: ['Angular', 'Firebase', 'Google Pay', 'Apple Pay'],
    wide: true,
    artId: 'food-ordering',
  },
  {
    title: 'Audio Recording Module for POS',
    description:
      'A Python audio-recording system with custom buffer management - automatic gain control, noise reduction and storage optimisation.',
    tags: ['Python', 'Flask'],
    icon: '🎙️',
  },
  {
    title: 'Transformation Conversational Chat',
    description:
      'A real-time chat app with WebSocket integration, automatic language translation, message persistence and user authentication.',
    tags: ['Python', 'Flask', 'MongoDB', 'WebSocket'],
    artId: 'chat',
  },
  {
    title: 'RMC Chatbot',
    description:
      'A conversational AI chatbot built on RASA with a custom NLP pipeline for intent classification and entity extraction, deployed on a serverless AWS architecture (S3 + Lambda).',
    tags: ['Python', 'RASA', 'AWS Lambda'],
    icon: '🤖',
  },
  {
    title: 'YouTube Transcript Summarizer',
    description:
      'A Chrome extension with a Python NLP backend that automatically summarises YouTube video transcripts.',
    tags: ['JavaScript', 'Python', 'Chrome Extension'],
    icon: '📺',
  },
  {
    title: 'Airline Reservation System',
    description:
      'A full-stack reservation system on .NET Web API and Angular, with a custom graph algorithm for optimal multi-city flight routing and support for one-way, round-trip and multi-city itineraries.',
    tags: ['.NET Web API', 'Angular', 'Graph Algorithms'],
    artId: 'airline',
  },
];

/**
 * Home's "Selected projects" teaser. Kept as its own distinct copy (shorter descriptions,
 * "Real-time Chat" instead of "Transformation Conversational Chat") rather than reusing
 * PROJECTS, matching the original site where these two pages never shared this copy.
 */
export const FEATURED_PROJECTS: Project[] = [
  {
    title: 'Restaurant POS System',
    description:
      'Multi-location POS on .NET microservices and Angular - real-time orders, inventory and a dynamic digital-menu engine with configurable business logic.',
    tags: ['.NET', 'Angular', 'AWS'],
    wide: true,
    artId: 'restaurant-pos',
  },
  {
    title: 'Real-time Chat',
    description:
      'WebSocket chat with automatic language translation, message persistence and authentication.',
    tags: ['Python', 'MongoDB', 'WebSocket'],
    icon: '💬',
  },
  {
    title: 'Airline Reservation',
    description:
      'Full-stack reservations with a custom graph algorithm for optimal multi-city flight routing.',
    tags: ['.NET Web API', 'Angular'],
    artId: 'airline',
  },
];
