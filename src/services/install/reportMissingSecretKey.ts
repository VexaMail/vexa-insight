import { getEnvSecretKey } from '@/services/settings-store'

/**
 * Says so, loudly, when an installed instance boots without its encryption
 * root.
 *
 * Since ADR 0010 the key is read from the environment only. Without it the app
 * still starts and still serves reports, but every stored mailbox password and
 * the AI provider key are unreadable, and the failure otherwise surfaces far
 * from its cause: ingestion simply stops finding credentials.
 */
export function reportMissingSecretKey(): void {
  if (getEnvSecretKey()) return
  console.error(
    '[secret] SECRET_KEY is not set on an installed instance. Stored mailbox ' +
      'credentials cannot be decrypted and ingestion will not run. Set it to ' +
      'the value this instance was installed with and restart.',
  )
}
