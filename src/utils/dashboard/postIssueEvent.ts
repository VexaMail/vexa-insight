import type {
  IssueApiErrorBody,
  IssueEventResult,
  IssueRowAction,
} from '@/types/dashboard'

/** Records an acknowledge, snooze or reopen through the issues events API. */
export async function postIssueEvent(
  issueKey: string,
  action: IssueRowAction,
  snoozeHours: number | null,
): Promise<IssueEventResult> {
  try {
    const res = await fetch('/api/v1/issues/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        snoozeHours ? { issueKey, action, snoozeHours } : { issueKey, action },
      ),
    })
    if (res.ok) return { ok: true, message: '' }
    const json = (await res
      .json()
      .catch(() => null)) as IssueApiErrorBody | null
    return {
      ok: false,
      message: json?.error?.message ?? `Error ${String(res.status)}`,
    }
  } catch {
    return { ok: false, message: 'Request failed.' }
  }
}
