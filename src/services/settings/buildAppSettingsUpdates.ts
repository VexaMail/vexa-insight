import type { SettingsUpdatePayload } from '@/types/settings'
import { settingsScalarFields } from './settingsScalarFields'

/** Collects the `app_settings` columns the payload actually asks to change. */
export function buildAppSettingsUpdates(
  payload: SettingsUpdatePayload,
): Record<string, unknown> {
  const updates: Record<string, unknown> = { updatedAt: new Date() }

  for (const field of settingsScalarFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field]
    }
  }

  if (payload.secretKey !== undefined && payload.secretKey.trim() !== '') {
    updates.secretKey = payload.secretKey
  }

  return updates
}
