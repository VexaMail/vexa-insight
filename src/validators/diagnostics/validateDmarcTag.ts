import { isValidDmarcPct } from './isValidDmarcPct'

/**
 * Validates a single DMARC tag name/value pair.
 * Returns a warning string if invalid, null if valid.
 */
export function validateDmarcTag(
  name: string,
  value: string,
  validPolicies: Set<string>,
): string | null {
  if (name === 'p' && !validPolicies.has(value.toLowerCase())) {
    return `Invalid policy "${value}". Must be none, quarantine, or reject.`
  }
  if (name === 'sp' && !validPolicies.has(value.toLowerCase())) {
    return `Invalid subdomain policy "${value}". Must be none, quarantine, or reject.`
  }
  if (name === 'pct' && !isValidDmarcPct(value)) {
    return `Invalid pct value "${value}". Must be 0-100.`
  }
  if (
    (name === 'adkim' || name === 'aspf') &&
    !['r', 's'].includes(value.toLowerCase())
  ) {
    return `Invalid ${name} value "${value}". Must be r (relaxed) or s (strict).`
  }
  return null
}
