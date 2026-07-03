export type BentoIllustrationId = 'backend' | 'frontend' | 'arch';

export interface BentoTile {
  id: 'backend' | 'frontend' | 'cloud' | 'arch' | 'auth' | 'mentor';
  title: string;
  description: string;
  tags?: string[];
  eyebrow?: string;
  /** Bold solid-indigo feature tile (only the Backend tile). */
  feature?: boolean;
  /** Inline SVG illustration id, for the 3 illustrated tiles. */
  illustration?: BentoIllustrationId;
  /** Oversized emoji watermark, for the 3 non-illustrated tiles. */
  emoji?: string;
}
