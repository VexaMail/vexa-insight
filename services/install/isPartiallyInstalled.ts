import { getDb, users } from '@/lib/db'
import { getSettingsRow } from '@/services/settings'
import { PLACEHOLDER_SECRET } from './placeholderSecret'

export function isPartiallyInstalled(): boolean {
  try {
    const row = getSettingsRow()
    if (!row) return false
    if (row.secretKey === PLACEHOLDER_SECRET) return false

    const db = getDb()
    const existingUsers = db.select({ id: users.id }).from(users).limit(1).get()

    // It is partially installed if settings are good but users are missing
    if (!existingUsers) return true

    return false
  } catch {
    return false
  }
}
