import { invalidateConfigCache } from '@/lib/config'
import { getDb, users } from '@/lib/db'
import { createSession, hashPassword } from '@/services/auth'
import { updateSettings } from '@/services/settings'
import type { InstallPayload } from '@/types/install'
import crypto from 'node:crypto'

/**
 * Updates app_settings row id=1 and imap_accounts from install payload; invalidates config cache.
 * Creates the initial superadmin user and establishes their session.
 * Call only when not yet installed (secret_key === 'CHANGE_ME') or partially installed (no users).
 */
async function completeInstall(
  payload: InstallPayload,
  isPartial: boolean = false,
): Promise<void> {
  const db = getDb()

  const userId = crypto.randomUUID()
  await db.insert(users).values({
    id: userId,
    username: payload.adminEmail,
    passwordHash: hashPassword(payload.adminPassword),
    role: 'admin',
  })

  await createSession(userId)

  if (isPartial) {
    return // Skip modifying settings if already initialized
  }
  updateSettings({
    secretKey: payload.secretKey ?? '',
    ingestionIntervalMinutes: payload.ingestionIntervalMinutes,
    ingestionDaysBack: payload.ingestionDaysBack,
    imapAccounts: (payload.imapAccounts ?? []).map((a) => ({
      label: a.label,
      server: a.server,
      port: a.port,
      username: a.username,
      password: a.password,
    })),
  })
  invalidateConfigCache()
}

export { completeInstall }
