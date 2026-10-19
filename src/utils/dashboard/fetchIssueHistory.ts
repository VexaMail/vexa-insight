import type { IssueHistoryBody } from '@/types/dashboard'
import type { IssueEvent } from '@/types/issues'

/** The recorded actions on one issue, oldest first; null when it failed. */
export async function fetchIssueHistory(
  issueKey: string,
): Promise<IssueEvent[] | null> {
  try {
    const res = await fetch(
      `/api/v1/issues/events?key=${encodeURIComponent(issueKey)}`,
    )
    if (!res.ok) return null
    const json = (await res.json()) as IssueHistoryBody
    return json.data ?? []
  } catch {
    return null
  }
}
