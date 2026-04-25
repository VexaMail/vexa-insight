import type { PollStatus } from '@/types/PollStatus'
import { getPollStatusFromDb } from './getPollStatusFromDb'

export async function getPollStatus(): Promise<PollStatus> {
  return getPollStatusFromDb()
}
