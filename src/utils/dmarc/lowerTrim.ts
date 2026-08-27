export function lowerTrim(s: unknown): string {
  return typeof s === 'string' ? s.toLowerCase().trim() : ''
}
