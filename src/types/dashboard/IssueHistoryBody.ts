import type { IssueEvent } from '@/types/issues'

/** Body of `GET /api/v1/issues/events?key=`. */
export type IssueHistoryBody = {
  data?: IssueEvent[]
}
