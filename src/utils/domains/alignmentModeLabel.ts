/** `adkim=` or `aspf=` in words; absent means relaxed, the default. */
export function alignmentModeLabel(value: string | null): string {
  return value === 's' ? 'strict' : 'relaxed'
}
