import semver from 'semver'

/**
 * Normalize a tag/version string into a semver-clean string ("v1.2.3" -> "1.2.3").
 * Returns null when the input is not parseable as semver.
 */
export function normalizeVersion(
  input: string | null | undefined,
): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (!trimmed) return null
  return semver.valid(semver.coerce(trimmed))
}
