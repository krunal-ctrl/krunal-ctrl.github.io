export interface DsaProblem {
  kind: 'problem';
  slug: string;
  route: string;
  title: string;
  html: string;
  excerpt: string;
  pattern: string[];
  topic: string[];
  difficulty: string;
  status: string;
}

export interface DsaNote {
  kind: 'index' | 'topic' | 'pattern';
  slug: string;
  route: string;
  title: string;
  html: string;
  excerpt: string;
}

export interface GroundPost {
  kind: 'post';
  slug: string;
  route: string;
  title: string;
  html: string;
  excerpt: string;
  date: string;
  category: string;
  frequency: string;
  norad_id: string;
  experiment_id: string;
  cover: string;
  keywords: string;
}

export interface JournalPost {
  kind: 'post';
  slug: string;
  route: string;
  title: string;
  html: string;
  excerpt: string;
  date: string;
  series: string;
  tags: string[];
}

export interface ContentIndex {
  dsa: {
    index: DsaNote | null;
    problems: DsaProblem[];
    topics: DsaNote[];
    patterns: DsaNote[];
  };
  ground: { posts: GroundPost[] };
  journal: { posts: JournalPost[] };
}
