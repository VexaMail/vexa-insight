import { getDb, users } from '@/lib/db'
import { hasInitializedSettings } from './hasInitializedSettings'

/**
 * Returns true if the app is installed: its settings are initialized AND at
 * least one user exists in the database.
 * Returns false when the DB does not exist, the settings row is missing, the
 * instance was never installed, or no users exist.
 * Safe to call before the DB exists (catches errors and returns false).
 */
function isInstalled(): boolean {
  try {
    if (!hasInitializedSettings()) return false

    const db = getDb()
    const existingUsers = db.select({ id: users.id }).from(users).limit(1).get()

    if (!existingUsers) return false

    return true
  } catch {
    return false
  }
}

export { isInstalled }
