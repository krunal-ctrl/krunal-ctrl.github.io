export interface Stat {
  label: string;
  /** Animates as "completed years since" this ISO date, instead of a fixed `count`. */
  since?: string;
  count?: number;
  prefix?: string;
  suffix?: string;
}
