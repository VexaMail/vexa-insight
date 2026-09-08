import type { SettingsFormState, SettingsPublic } from '@/types/settings'
import { buildSettingsUpdatePayload } from './buildSettingsUpdatePayload'

/** Persists the settings form. Throws with the server's message on failure. */
export async function saveSettings(
  form: SettingsFormState,
  apiKey: string,
): Promise<SettingsPublic> {
  const res = await fetch('/api/v1/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify(buildSettingsUpdatePayload(form)),
  })

  const json = (await res.json()) as
    { data: SettingsPublic } | { error?: { message?: string } }

  if (!res.ok || !('data' in json)) {
    const message = 'error' in json ? json.error.message : undefined
    throw new Error(message ?? `Error ${String(res.status)}`)
  }

  return json.data
}
