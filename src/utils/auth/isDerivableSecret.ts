import { MIN_ENCRYPTION_KEY_LENGTH, PLACEHOLDER_SECRET } from '@/constants/auth'

/**
 * True when a value can serve as the encryption root key.
 *
 * Weaker than `isUsableSecret`, on purpose: that one answers "is this strong
 * enough to authenticate an admin API call", which is a different question from
 * "can this decrypt what it encrypted". It lives here rather than beside that
 * one because `@/services/credentials` re-exports `hasValidApiKey`, which
 * reaches back into the config that has to consult this predicate first.
 */
export function isDerivableSecret(secret: string | null | undefined): boolean {
  if (!secret) return false
  if (secret === PLACEHOLDER_SECRET) return false
  return secret.length >= MIN_ENCRYPTION_KEY_LENGTH
}
