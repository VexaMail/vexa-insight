import { isSpfLookupMechanism } from './isSpfLookupMechanism'

/**
 * Extracts the SPF terms that consume DNS lookups (include, redirect, a, mx,
 * exists), with any leading qualifier (+ - ~ ?) stripped.
 */
export function extractSpfLookupMechanisms(record: string): string[] {
  return record
    .trim()
    .split(/\s+/)
    .slice(1)
    .map((term) => term.replace(/^[+\-~?]/, ''))
    .filter((term) => isSpfLookupMechanism(term))
}
