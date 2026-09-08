import type { TriggerPollResponse, TriggerPollResult } from '@/types/ingest'
import { triggerPollMessage } from './triggerPollMessage'

/** Starts an ingestion run and reduces the response to a UI message. */
export async function triggerPoll(
  apiKey: string,
  fullRescan: boolean,
): Promise<TriggerPollResult> {
  try {
    const res = await fetch('/api/v1/admin/trigger-poll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({ fullRescan }),
    })
    const json = (await res.json()) as TriggerPollResponse
    if (!res.ok) {
      const failure = 'error' in json ? json.error : undefined
      return {
        status: 'error',
        message: failure?.message ?? `Error ${String(res.status)}`,
      }
    }
    return { status: 'success', message: triggerPollMessage(json) }
  } catch {
    return { status: 'error', message: 'Request failed.' }
  }
}
