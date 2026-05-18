import { SELF_UPDATE_REF_PATTERN } from '@/constants/updates'

/**
 * Whitelist refs accepted by the self-update endpoint to prevent the
 * `ref` parameter from being abused as an arbitrary git argument.
 * Only proper semver tags (`vX.Y.Z` with optional pre-release) are valid.
 */
export function isValidUpdateRef(ref: string | null | undefined): boolean {
  if (!ref) return false
  const trimmed = ref.trim()
  if (!trimmed) return false
  return SELF_UPDATE_REF_PATTERN.test(trimmed)
}
