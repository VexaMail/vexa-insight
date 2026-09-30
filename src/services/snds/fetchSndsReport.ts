import { SNDS_API_BASE } from '@/constants/snds'
import type { SndsFetchResult } from '@/types/snds'

/**
 * GETs one SNDS report path (`report/data/<date>`, `report/status/ip`).
 * SNDS answers 404 when there is simply no data, so that is a result, not an
 * error; anything else that is not 200 throws.
 */
export async function fetchSndsReport(
  accessToken: string,
  path: string,
): Promise<SndsFetchResult> {
  const res = await fetch(`${SNDS_API_BASE}/${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })
  if (res.status === 404) return { status: 'no-data' }
  if (!res.ok) {
    throw new Error(`SNDS ${path} answered HTTP ${String(res.status)}`)
  }
  const text = await res.text()
  if (text.trim() === '') return { status: 'no-data' }
  try {
    return { status: 'ok', body: JSON.parse(text) as unknown }
  } catch {
    throw new Error(`SNDS ${path} returned a body that is not JSON`)
  }
}
