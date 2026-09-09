import { UPDATE_CHECK_ENDPOINT_PATH } from '@/constants/updates'
import type { UpdateStatusPublic } from '@/types/updates'

/** Ask the server to check for updates now, returning the fresh status. */
export async function postUpdateCheck(
  token: string,
): Promise<UpdateStatusPublic> {
  const response = await fetch(UPDATE_CHECK_ENDPOINT_PATH, {
    method: 'POST',
    headers: { 'x-api-key': token },
  })
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string }
    } | null
    throw new Error(
      body?.error?.message ?? `Request failed (${String(response.status)})`,
    )
  }
  const json = (await response.json()) as { data: UpdateStatusPublic }
  return json.data
}
