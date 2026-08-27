import semver from 'semver'

/**
 * Returns true when `latest` is a strictly higher semver than `current`.
 * Returns false for equal versions, downgrades, or when either side is unparseable.
 */
export function isUpdateAvailable(
  current: string | null | undefined,
  latest: string | null | undefined,
): boolean {
  if (!current || !latest) return false
  const c = semver.coerce(current)
  const l = semver.coerce(latest)
  if (!c || !l) return false
  return semver.gt(l, c)
}
