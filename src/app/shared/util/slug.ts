/** Mirror of the pipeline's slugify (scripts/build-content.mjs) for matching tags to routes. */
export function slugify(s: string): string {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
