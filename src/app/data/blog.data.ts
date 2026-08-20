/** The blog's series/collections, shown on the /blog hub. Add a new series here. */
export interface BlogCollection {
  id: 'dsa' | 'ground' | 'journal';
  title: string;
  tagline: string;
  route: string;
  accent: 'violet' | 'teal' | 'pink';
}

export const BLOG_COLLECTIONS: BlogCollection[] = [
  {
    id: 'dsa',
    title: 'DSA Notes',
    tagline: 'LeetCode, broken down — the idea, the code, the complexity, and a hand-drawn sketch.',
    route: '/blog/dsa',
    accent: 'violet',
  },
  {
    id: 'ground',
    title: 'Ground Station',
    tagline: 'Building KS14NM — a DIY TinyGS satellite ground station listening to space.',
    route: '/blog/ground',
    accent: 'teal',
  },
  {
    id: 'journal',
    title: 'Journal',
    tagline: 'Daily notes and one-offs — whatever I happen to be thinking through.',
    route: '/blog/journal',
    accent: 'pink',
  },
];
