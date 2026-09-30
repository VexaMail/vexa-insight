import type { SndsApiResult } from '@/types/settings'

/** Calls an SNDS admin endpoint with the admin API key and unwraps `data`. */
export async function callSndsAdminApi<T>(
  apiKey: string,
  path: '' | '/authorize' | '/callback' | '/sync',
  method: 'GET' | 'POST' | 'DELETE',
  body?: unknown,
): Promise<SndsApiResult<T>> {
  try {
    const res = await fetch(`/api/v1/admin/snds${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
    const json = (await res.json()) as {
      data?: T
      error?: { message?: string }
    }
    if (!res.ok || json.data === undefined) {
      return { ok: false, message: json.error?.message ?? 'Request failed.' }
    }
    return { ok: true, data: json.data }
  } catch {
    return { ok: false, message: 'Request failed.' }
  }
}
