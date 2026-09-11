import { getEnvSecretKey } from './getEnvSecretKey'

/**
 * The key every stored secret is encrypted with, or null when the environment
 * does not supply one.
 *
 * There is deliberately no database fallback. A key read from `app_settings`
 * would be sitting inside the very file it encrypts, which is the failure
 * ADR 0009 was written to close and which a column update cannot undo, because
 * SQLite leaves freed bytes in place. Keeping the key out of the file is the
 * only version of that promise that survives someone copying `vexa.db`.
 *
 * See `docs/adr/0010-secret-key-is-environment-only.md`.
 */
export function resolveSecretKey(): string | null {
  return getEnvSecretKey()
}
