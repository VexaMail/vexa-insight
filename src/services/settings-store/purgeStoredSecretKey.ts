import { PLACEHOLDER_SECRET } from '@/constants/auth'
import { appSettings, getDb } from '@/lib/db'
import { eq, sql } from 'drizzle-orm'
import { getEnvSecretKey } from './getEnvSecretKey'
import { getSettingsRow } from './getSettingsRow'
import { SETTINGS_ID } from './settingsId'

/**
 * Removes the legacy stored copy of the root secret from the database file.
 *
 * Releases up to 0.2.2 seeded `SECRET_KEY` into `app_settings.secret_key`,
 * which left the encryption key inside the very file it protects. Blanking the
 * column is not enough on its own: SQLite runs with `secure_delete` off, so the
 * freed cell keeps its old bytes and a raw copy of the file can still yield the
 * key. `VACUUM` rewrites the file, which is what actually drops them.
 *
 * The purge happens only when the environment carries the same value, so an
 * instance whose key exists nowhere else is never stripped of it. A column that
 * differs came from an in-app rotation and is now unreachable, because
 * `resolveSecretKey` no longer reads the database; that case is reported rather
 * than destroyed, since it is the only key the stored ciphertext will open.
 */
export function purgeStoredSecretKey(): void {
  const fromEnv = getEnvSecretKey()
  const row = getSettingsRow()
  if (!row || row.secretKey === PLACEHOLDER_SECRET) return

  if (row.secretKey !== fromEnv) {
    console.error(
      '[secret] app_settings.secret_key holds a key that SECRET_KEY does not ' +
        'match. Since 0.2.3 the database copy is never used, so stored IMAP ' +
        'and AI credentials cannot be decrypted until SECRET_KEY is set to ' +
        'that value. See docs/adr/0010-secret-key-is-environment-only.md.',
    )
    return
  }

  const db = getDb()
  db.update(appSettings)
    .set({ secretKey: PLACEHOLDER_SECRET, updatedAt: new Date() })
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()
  // Not cosmetic: without this the old key stays readable in the file's free
  // space. VACUUM cannot run inside a transaction, hence the separate call.
  db.run(sql`VACUUM`)
  console.warn(
    '[secret] removed the stored copy of SECRET_KEY from the database and ' +
      'rewrote the file. Any backup taken before now still contains it: treat ' +
      'that key as exposed and rotate it.',
  )
}
