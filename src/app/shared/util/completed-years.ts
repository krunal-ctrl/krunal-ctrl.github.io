/** Whole completed years between an ISO date and now, correctly handling month/day rollover. */
export function completedYears(iso: string): number {
  const start = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}
