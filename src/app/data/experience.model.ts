export interface Experience {
  role: string;
  company: string;
  companyUrl: string;
  dateRange: string;
  location: string;
  bullets: string[];
  /** Shortened bullets shown in Home's brief timeline teaser, when it differs from a simple slice of `bullets`. */
  briefBullets?: string[];
}
