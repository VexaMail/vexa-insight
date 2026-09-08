import { APPLY_UPDATE_ENDPOINT_PATH } from '@/constants/updates'
import type { SelfUpdateStatus } from '@/types/updates'

/** Ask the server to apply the latest update, returning the new status. */
export async function startSelfUpdate(
  apiKey: string,
): Promise<SelfUpdateStatus> {
  const response = await fetch(APPLY_UPDATE_ENDPOINT_PATH, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string }
    } | null
    throw new Error(
      body?.error?.message ?? `Request failed (${String(response.status)})`,
    )
  }

  const json = (await response.json()) as { data: SelfUpdateStatus }
  return json.data
}
