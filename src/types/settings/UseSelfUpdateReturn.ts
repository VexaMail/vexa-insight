import type { SelfUpdateStatus } from '@/types/updates'

export type UseSelfUpdateReturn = {
  readonly status: SelfUpdateStatus | null
  readonly isLoading: boolean
  readonly isStarting: boolean
  readonly error: string | null
  readonly handleApplyClick: () => void
}
