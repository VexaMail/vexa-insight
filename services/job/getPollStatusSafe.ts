import type { PollStatus } from '@/types/dashboard'
import { DEFAULT_POLL_STATUS } from './defaultPollStatus'
import { getPollStatus } from './getPollStatus'

export async function getPollStatusSafe(): Promise<PollStatus> {
  try {
    return await getPollStatus()
  } catch {
    return DEFAULT_POLL_STATUS
  }
}
