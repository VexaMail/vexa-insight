import type { MaxOAuthCredentials } from '../contracts/MaxOAuthCredentials'
import { readKeychainSecret } from './readKeychainSecret'

/**
 * Reads the Claude Max subscription OAuth credentials from the Keychain entry
 * Claude Code maintains. Throws when the entry is absent or does not carry a
 * `claudeAiOauth` object, so a missing login fails here rather than as an
 * opaque 401 from the API.
 */
export function readMaxOAuthCredentials(): MaxOAuthCredentials {
  const raw = readKeychainSecret('Claude Code-credentials')
  const parsed = JSON.parse(raw) as { claudeAiOauth?: MaxOAuthCredentials }
  if (parsed.claudeAiOauth === undefined) {
    throw new Error(
      'Keychain entry "Claude Code-credentials" has no claudeAiOauth object',
    )
  }
  return parsed.claudeAiOauth
}
