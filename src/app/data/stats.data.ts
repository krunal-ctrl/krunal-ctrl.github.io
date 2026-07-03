import { Stat } from './stats.model';
import { CAREER_START_ISO } from './career';

export const STATS: Stat[] = [
  { label: 'Years shipping software', since: CAREER_START_ISO, suffix: '+' },
  { label: 'Fewer component bugs', count: 70, prefix: '~', suffix: '%' },
  { label: 'Faster Blazor modules', count: 50, suffix: '%' },
  { label: 'Engineers mentored', count: 10, suffix: '+' },
];
