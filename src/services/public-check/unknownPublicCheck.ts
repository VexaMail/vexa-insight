import type { PublicCheck } from '../../types/public-check/PublicCheck'

export function unknownPublicCheck(name: string): PublicCheck {
  return {
    name,
    status: 'unknown',
    summary: 'DNS could not be checked.',
    recommendation:
      'The resolver did not return a reliable answer. Try again shortly; this does not mean the record is missing.',
    records: [],
  }
}
