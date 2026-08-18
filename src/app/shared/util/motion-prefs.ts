/** Single source of truth for the motion-related media queries the Apple-design system respects. */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function prefersReducedTransparency(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches;
}

export function prefersMoreContrast(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-contrast: more)').matches;
}
