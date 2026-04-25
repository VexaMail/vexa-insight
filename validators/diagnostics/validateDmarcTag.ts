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
  if (name === 'pct') {
    const n = Number(value)
    if (Number.isNaN(n) || n < 0 || n > 100) {
      return `Invalid pct value "${value}". Must be 0-100.`
    }
  }
  if (name === 'adkim' && !['r', 's'].includes(value.toLowerCase())) {
    return `Invalid adkim value "${value}". Must be r (relaxed) or s (strict).`
  }
  if (name === 'aspf' && !['r', 's'].includes(value.toLowerCase())) {
    return `Invalid aspf value "${value}". Must be r (relaxed) or s (strict).`
  }
  return null
}
