import type { executeDns } from './executeDns'

export type ComputeLookupScheduleInput = {
  status: Awaited<ReturnType<typeof executeDns>>['status']
  now: Date
  previousRetryCount: number
  previousSuccessAt: Date | null
}
