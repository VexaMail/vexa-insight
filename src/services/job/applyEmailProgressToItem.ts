import type { EmailProgressPayload, ProgressItem } from '@/types/dashboard'
import { nowIso } from './nowIso'
import { resolveProgressSteps } from './resolveProgressSteps'

export function applyEmailProgressToItem(
  current: ProgressItem | undefined,
  payload: EmailProgressPayload,
): ProgressItem {
  const id = `${String(payload.accountId)}:${payload.uid}`
  const label = payload.subject ?? `Email UID ${payload.uid}`
  const emailDate = payload.emailDate ?? current?.emailDate
  const { steps, status } = resolveProgressSteps(
    payload.step,
    current?.steps ?? [],
  )

  return {
    emailDate,
    id,
    label,
    processedAt: nowIso(),
    steps,
    status,
  }
}
