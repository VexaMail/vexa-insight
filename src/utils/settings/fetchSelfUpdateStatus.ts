import { APPLY_UPDATE_ENDPOINT_PATH } from '@/constants/updates'
import type { SelfUpdateStatus } from '@/types/updates'

/** Current self-update status; throws with the server's status on failure. */
export async function fetchSelfUpdateStatus(): Promise<SelfUpdateStatus> {
  const response = await fetch(APPLY_UPDATE_ENDPOINT_PATH, {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error(`Request failed (${String(response.status)})`)
  }

  const json = (await response.json()) as { data: SelfUpdateStatus }
  return json.data
}
