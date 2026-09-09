import { UPDATE_CHECK_ENDPOINT_PATH } from '@/constants/updates'
import type { UpdateStatusPublic } from '@/types/updates'

/** Last known update-check result; throws with the server's status on failure. */
export async function fetchUpdateStatus(): Promise<UpdateStatusPublic> {
  const response = await fetch(UPDATE_CHECK_ENDPOINT_PATH, {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error(`Request failed (${String(response.status)})`)
  }
  const json = (await response.json()) as { data: UpdateStatusPublic }
  return json.data
}
