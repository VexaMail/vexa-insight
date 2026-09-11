import type { SettingsUpdatePayload } from '@/types/settings'
import { settingsScalarFields } from './settingsScalarFields'

/**
 * Collects the `app_settings` columns the payload actually asks to change.
 *
 * `secret_key` is not among them and cannot be: since ADR 0010 the encryption
 * root is read from the environment only, so a value written here would be
 * stored and never used.
 */
export function buildAppSettingsUpdates(
  payload: SettingsUpdatePayload,
): Record<string, unknown> {
  const updates: Record<string, unknown> = { updatedAt: new Date() }

  for (const field of settingsScalarFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field]
    }
  }

  return updates
}
