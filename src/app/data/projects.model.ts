export type ProjectArtId = 'restaurant-pos' | 'food-ordering' | 'chat' | 'airline';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Card spans 2 grid columns. Independent of whether it has an SVG banner or emoji icon. */
  wide?: boolean;
  /** Emoji icon shown for cards with no illustrated banner. */
  icon?: string;
  /** Illustrated SVG banner (see ProjectArtId) shown instead of `icon`. */
  artId?: ProjectArtId;
}
