import { PLACEHOLDER_SECRET } from '@/constants/auth'
import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { getEnvSecretKey } from './getEnvSecretKey'
import { getSettingsRow } from './getSettingsRow'
import { SETTINGS_ID } from './settingsId'

/**
 * Removes the stored copy of the root secret when the environment already
 * carries the same value.
 *
 * Releases up to 0.2.2 seeded `SECRET_KEY` from the environment into
 * `app_settings.secret_key`, which left the encryption key sitting in the very
 * database file it protects. Where the two values still match, dropping the
 * column back to its placeholder loses nothing: `resolveSecretKey` falls
 * through to the environment and every stored ciphertext stays readable.
 *
 * A column that differs from the environment is left alone — it is the product
 * of an in-app rotation and is the only key the stored ciphertext will open.
 */
export function clearDuplicatedSecretKey(): void {
  const fromEnv = getEnvSecretKey()
  if (!fromEnv) return
  const row = getSettingsRow()
  if (!row || row.secretKey !== fromEnv) return
  getDb()
    .update(appSettings)
    .set({ secretKey: PLACEHOLDER_SECRET, updatedAt: new Date() })
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()
}
