import { appSettings, getDb, imapAccounts } from '@/lib/db'
import { getConfig } from '@/services/config'
import { encryptSecret } from '@/services/crypto'
import { SETTINGS_ID } from '@/services/settings-store'
import type { SettingsUpdatePayload } from '@/types/settings'
import { eq } from 'drizzle-orm'
import { derivePasswordForWrite } from './derivePasswordForWrite'
import { getExistingImapPasswords } from './getExistingImapPasswords'

function updateSettings(payload: SettingsUpdatePayload): void {
  const db = getDb()
  const updates: Record<string, unknown> = { updatedAt: new Date() }
  const fields: (keyof SettingsUpdatePayload)[] = [
    'apiV1Str',
    'ingestionIntervalMinutes',
    'ingestionDaysBack',
    'ingestionIncludeTrash',
    'ingestionIncludeAllFolders',
    'backendCorsOrigins',
    'environment',
    'ipHostnameLookupEnabled',
    'ipHostnameRefreshIntervalHours',
    'ipHostnameTimeoutMs',
    'ipHostnameMaxRetries',
    'ipHostnameRetryBackoffMinutes',
    'ipHostnameBatchSize',
    'ipHostnameManualRefreshEnabled',
    'ipHostnameAllowPrivateIps',
    'ipHostnameNegativeCacheHours',
  ]

  for (const field of fields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field]
    }
  }

  const payloadSecret = (payload.secretKey ?? '').trim()
  if (payload.secretKey !== undefined && payloadSecret !== '') {
    updates.secretKey = payload.secretKey
  }
  db.update(appSettings)
    .set(updates)
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()

  if (payload.imapAccounts !== undefined) {
    const secretKey =
      payloadSecret !== '' ? payloadSecret : getConfig().secretKey

    const hasAnyNewPassword = payload.imapAccounts.some(
      (a) => a.password !== undefined && a.password.trim() !== '',
    )
    if (hasAnyNewPassword && !secretKey) {
      throw new Error(
        'SECRET_KEY must be configured before storing IMAP credentials',
      )
    }

    const existingRows = db
      .select({ id: imapAccounts.id })
      .from(imapAccounts)
      .all()
    const existingIds = new Set(existingRows.map((r) => r.id))
    const passwordsById = getExistingImapPasswords(db)
    const idsInPayload = payload.imapAccounts
      .map((a) => a.id)
      .filter((id): id is number => typeof id === 'number' && id > 0)
    const idsToDelete = existingRows
      .map((r) => r.id)
      .filter((id) => !idsInPayload.includes(id))
    for (const id of idsToDelete) {
      db.delete(imapAccounts).where(eq(imapAccounts.id, id)).run()
    }
    payload.imapAccounts.forEach((acc, index) => {
      const isUpdate = acc.id != null && existingIds.has(acc.id)
      const hasNewPassword =
        acc.password !== undefined && acc.password.trim() !== ''

      const passwordForInsert = derivePasswordForWrite({
        hasNewPassword,
        newPassword: acc.password,
        existingPassword: acc.id != null ? passwordsById[acc.id] : undefined,
        secretKey,
      })

      if (isUpdate && acc.id != null) {
        const updateRow: Record<string, string | number | boolean | null> = {
          label: acc.label,
          server: acc.server,
          port: acc.port,
          username: acc.username,
          sortOrder: index,
          fetchIncludeTrash: acc.fetchIncludeTrash ?? false,
          fetchIncludeAllFolders: acc.fetchIncludeAllFolders ?? false,
          postProcessAction: acc.postProcessAction ?? 'none',
          postProcessFolder: acc.postProcessFolder ?? null,
          moveToTrashAfterProcess: acc.moveToTrashAfterProcess ?? false,
          markAsReadAfterProcess: acc.markAsReadAfterProcess ?? false,
        }
        if (hasNewPassword && acc.password) {
          updateRow.password = encryptSecret(acc.password.trim(), secretKey)
        }
        db.update(imapAccounts)
          .set(updateRow)
          .where(eq(imapAccounts.id, acc.id))
          .run()
      } else {
        db.insert(imapAccounts)
          .values({
            label: acc.label,
            server: acc.server,
            port: acc.port,
            username: acc.username,
            password: passwordForInsert,
            sortOrder: index,
            fetchIncludeTrash: acc.fetchIncludeTrash ?? false,
            fetchIncludeAllFolders: acc.fetchIncludeAllFolders ?? false,
            postProcessAction: acc.postProcessAction ?? 'none',
            postProcessFolder: acc.postProcessFolder ?? null,
            moveToTrashAfterProcess: acc.moveToTrashAfterProcess ?? false,
            markAsReadAfterProcess: acc.markAsReadAfterProcess ?? false,
          })
          .run()
      }
    })
  }
}

export { updateSettings }
