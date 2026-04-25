import type { getPollStatusFromDb } from '@/services/job'

export type PollStatus = Awaited<ReturnType<typeof getPollStatusFromDb>>
