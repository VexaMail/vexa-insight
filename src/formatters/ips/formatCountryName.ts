/** English name of an ISO country code, or the code when unknown. */
export function formatCountryName(code: string | null): string | null {
  if (!code) return null
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}
