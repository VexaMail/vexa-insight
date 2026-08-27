export function str(s: unknown): string {
  return typeof s === 'string' ? s : ''
}
