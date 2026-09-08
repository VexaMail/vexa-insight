import type { AIProviderSettingsPublic } from '@/types/ai'
import type { AiSettingsSaveResult } from '@/types/settings'

/** Writes the AI provider settings and normalizes the response. */
export async function putAiSettings(
  apiKey: string,
  body: Record<string, unknown>,
): Promise<AiSettingsSaveResult> {
  try {
    const res = await fetch('/api/v1/admin/ai-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(body),
    })
    const json = (await res.json()) as
      { data: AIProviderSettingsPublic } | { error: { message: string } }

    if (!res.ok) {
      return {
        ok: false,
        message:
          'error' in json ? json.error.message : `Error ${String(res.status)}`,
      }
    }
    return { ok: true, data: 'data' in json ? json.data : null }
  } catch {
    return { ok: false, message: 'Request failed.' }
  }
}
