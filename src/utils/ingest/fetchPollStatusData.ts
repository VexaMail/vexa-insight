import { doFetch } from '@/lib/fetch'
import type { PollStatusResponseData } from '@/types/ingest'

/** Reads one poll-status payload; any failure yields undefined. */
export async function fetchPollStatusData(
  url: string,
): Promise<PollStatusResponseData | undefined> {
  try {
    const res = await doFetch(url)
    const json = (await res.json()) as { data?: PollStatusResponseData }
    return json.data
  } catch {
    return undefined
  }
}
