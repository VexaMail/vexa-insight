import type { AdminApiEnvelope, AdminApiResult } from '@/types/settings'

/** Calls an admin API route with the session cookie and unwraps `data`. */
export async function callAdminApi<T>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown,
): Promise<AdminApiResult<T>> {
  try {
    const res = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
    const json = (await res.json()) as AdminApiEnvelope<T>
    if (!res.ok || json.data === undefined) {
      return { ok: false, message: json.error?.message ?? 'Request failed.' }
    }
    return { ok: true, data: json.data }
  } catch {
    return { ok: false, message: 'Request failed.' }
  }
}
