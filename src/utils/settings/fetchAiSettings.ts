import type { AIProviderSettingsPublic } from '@/types/ai'

/** Loads the stored AI provider settings, or null when unavailable. */
export async function fetchAiSettings(
  apiKey: string,
  signal: AbortSignal,
): Promise<AIProviderSettingsPublic | null> {
  try {
    const res = await fetch('/api/v1/admin/ai-settings', {
      headers: { 'X-API-Key': apiKey },
      signal,
    })
    if (!res.ok) return null
    const json = (await res.json()) as { data: AIProviderSettingsPublic }
    return json.data
  } catch {
    // Aborted or offline: the caller keeps whatever it already had.
    return null
  }
}
