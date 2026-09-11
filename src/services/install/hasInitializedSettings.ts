import { getSettingsRow, resolveSecretKey } from '@/services/settings-store'

/**
 * True when the instance already has its settings in place, whether or not an
 * admin user exists yet.
 *
 * `installedAt` is the durable marker, set when the wizard completes. The
 * fallback on a resolvable key covers the case the marker cannot: a container
 * booting for the first time with `SECRET_KEY` in its environment is already
 * configured enough to skip the settings half of the wizard, exactly as it was
 * before the key moved out of the database.
 */
export function hasInitializedSettings(): boolean {
  const row = getSettingsRow()
  if (!row) return false
  if (row.installedAt !== null) return true
  return resolveSecretKey() !== null
}
