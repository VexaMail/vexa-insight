/** "1 day ago", "3 days ago": a count of one unit, pluralised. */
export function formatAgoUnit(value: number, unit: string): string {
  return `${String(value)} ${unit}${value === 1 ? '' : 's'} ago`
}
