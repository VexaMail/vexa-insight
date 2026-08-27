import type { InstallPayload } from '@/types/install'
import { validateAdmin } from './validateAdmin'
import { validateSettings } from './validateSettings'

/**
 * Validates request body for POST /api/install.
 * If isPartial is false, requires secretKey and imapAccounts with at least one valid account.
 */
function validateInstallBody(
  body: unknown,
  isPartial: boolean = false,
): { ok: true; payload: InstallPayload } | { ok: false; message: string } {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, message: 'Invalid body' }
  }
  const o = body as Record<string, unknown>

  const adminResult = validateAdmin(o)
  if ('error' in adminResult) return { ok: false, message: adminResult.error }

  const payload: InstallPayload = {
    adminEmail: adminResult.adminEmail,
    adminPassword: adminResult.adminPassword,
  }

  if (!isPartial) {
    const settingsResult = validateSettings(o)
    if ('error' in settingsResult)
      return { ok: false, message: settingsResult.error }

    payload.secretKey = settingsResult.secretKey
    payload.imapAccounts = settingsResult.imapAccounts
    if (settingsResult.ingestionIntervalMinutes !== undefined) {
      payload.ingestionIntervalMinutes = settingsResult.ingestionIntervalMinutes
    }
    payload.ingestionDaysBack = settingsResult.ingestionDaysBack
  }

  return { ok: true, payload }
}

export { validateInstallBody }
