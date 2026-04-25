/**
 * Normalizes envelope date (Date or string) to ISO string, or undefined if missing/invalid.
 */
export function envelopeDateToIso(envelopeDate: unknown): string | undefined {
  if (envelopeDate instanceof Date) return envelopeDate.toISOString()
  if (typeof envelopeDate === 'string') return envelopeDate
  return undefined
}
