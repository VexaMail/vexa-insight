import type { UpdateStatusPublic } from '@/types/updates'

export type UseUpdateStatusReturn = {
  readonly status: UpdateStatusPublic | null
  readonly isLoading: boolean
  readonly isRefreshing: boolean
  readonly error: string | null
  readonly handleRefreshClick: () => void
  readonly handleCopyText: (text: string) => void
}
