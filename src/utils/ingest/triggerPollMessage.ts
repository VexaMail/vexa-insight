import type { TriggerPollResponse } from '@/types/ingest'

/** One-line summary of a finished poll run. */
export function triggerPollMessage(json: TriggerPollResponse): string {
  const data = 'data' in json ? json.data : undefined
  return data?.success
    ? `Processed ${String(data.processed ?? 0)}, ingested ${String(data.ingested ?? 0)}.`
    : `Done with ${String(data?.errors ?? 0)} errors.`
}
