import type { PollStatus } from '@/types/dashboard'
import { paginateProgressItems } from '@/utils/dashboard'
import { buildPollStatus } from './buildPollStatus'
import { getPollStatusFromDb } from './getPollStatusFromDb'
import { loadJobRunProgressItems } from './loadJobRunProgressItems'

export async function getPollStatus(
  page = 1,
  pageSize = 50,
  jobRunId?: number,
): Promise<PollStatus> {
  const status = jobRunId === undefined ? await getPollStatusFromDb() : null
  const targetJobRunId = jobRunId ?? status?.activeJobRunId
  const ordered = targetJobRunId
    ? await loadJobRunProgressItems(targetJobRunId)
    : []

  return buildPollStatus(status, paginateProgressItems(ordered, page, pageSize))
}
