import { getDb, users } from '@/lib/db'
import { getSettingsRow } from '@/services/settings-store'
import { PLACEHOLDER_SECRET } from './placeholderSecret'

/**
 * Returns true if the app is installed: app_settings row id=1 exists, secret_key !== 'CHANGE_ME',
 * AND at least one user exists in the database.
 * Returns false when DB does not exist, row is missing, secret is placeholder, or no users exist.
 * Safe to call before DB exists (catches errors and returns false).
 */
function isInstalled(): boolean {
  try {
    const row = getSettingsRow()
    if (!row) return false
    if (row.secretKey === PLACEHOLDER_SECRET) return false

    const db = getDb()
    const existingUsers = db.select({ id: users.id }).from(users).limit(1).get()

    if (!existingUsers) return false

    return true
  } catch {
    return false
  }
}

export { isInstalled }
