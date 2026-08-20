/** Single source of truth for the primary nav - edit here to add/remove/reorder links. */
export interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Home', exact: true },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
];

/** Single source of truth for external/contact links, referenced from header, footer, and page CTAs. */
export const SITE_LINKS = {
  github: 'https://github.com/krunal-ctrl',
  linkedin: 'https://www.linkedin.com/in/krunal-jethva/',
  twitter: 'https://twitter.com/jethva_krunal',
  email: 'krunaljethva90@gmail.com',
  resume: 'resume.pdf',
} as const;
