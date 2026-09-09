import type { PollStatusUrlParams } from '@/types/ingest'

/** Poll-status endpoint for the live run or one historical job, cache-busted. */
export function buildPollStatusUrl({
  isHistoricalJobContext,
  jobId,
  page,
  pageSize,
}: PollStatusUrlParams): string {
  const query = `page=${String(page)}&pageSize=${String(pageSize)}&_=${String(Date.now())}`
  return isHistoricalJobContext && jobId
    ? `/api/v1/job-runs/${String(jobId)}/poll-status?${query}`
    : `/api/v1/poll-status?${query}`
}
