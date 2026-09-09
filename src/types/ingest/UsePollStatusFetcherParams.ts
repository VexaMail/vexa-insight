import type { PollStatusResponseData } from './PollStatusResponseData'

export type UsePollStatusFetcherParams = {
  readonly isHistoricalJobContext: boolean
  readonly jobId?: number | undefined
  readonly page: number
  readonly pageSize: number
  readonly isRunning: boolean
  readonly runRequested: boolean
  readonly abortStatus: string
  readonly applyPollStatusData: (data: PollStatusResponseData) => void
}
