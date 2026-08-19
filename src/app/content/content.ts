import { Injectable } from '@angular/core';
import indexData from './content.index.json';
import { ContentIndex } from './content.model';
import { slugify } from '../shared/util/slug';

const DATA = indexData as unknown as ContentIndex;

/** Read-only accessor over the build-time content index (see scripts/build-content.mjs). */
@Injectable({ providedIn: 'root' })
export class Content {
  readonly dsaIndex = DATA.dsa.index;
  readonly problems = DATA.dsa.problems;
  readonly topics = DATA.dsa.topics;
  readonly patterns = DATA.dsa.patterns;
  readonly groundPosts = DATA.ground.posts;

  problem(slug: string) {
    return this.problems.find((p) => p.slug === slug);
  }
  topic(slug: string) {
    return this.topics.find((t) => t.slug === slug);
  }
  pattern(slug: string) {
    return this.patterns.find((p) => p.slug === slug);
  }
  groundPost(slug: string) {
    return this.groundPosts.find((p) => p.slug === slug);
  }

  problemsByTopic(slug: string) {
    return this.problems.filter((p) => p.topic.some((t) => slugify(t) === slug));
  }
  problemsByPattern(slug: string) {
    return this.problems.filter((p) => p.pattern.some((t) => slugify(t) === slug));
  }
}
