import type {
  EmailProgressPayload,
  ProgressItem,
  ProgressStep,
} from '@/types/dashboard'
import { EMAIL_PROGRESS_STEP_LABELS } from '@/utils/dashboard'
import { nowIso } from './nowIso'
import { STEP_ORDER } from './stepOrder'
import { TERMINAL_STEPS } from './terminalSteps'

export function applyEmailProgressToItem(
  current: ProgressItem | undefined,
  payload: EmailProgressPayload,
): ProgressItem {
  const id = `${String(payload.accountId)}:${payload.uid}`
  const label = payload.subject ?? `Email UID ${payload.uid}`
  const emailDate = payload.emailDate ?? current?.emailDate

  if (payload.step === 'already_processed') {
    return {
      emailDate,
      id,
      label,
      processedAt: nowIso(),
      steps: [
        {
          key: 'already_processed',
          label:
            EMAIL_PROGRESS_STEP_LABELS.already_processed ?? 'Already processed',
          status: 'done',
        },
      ],
      status: 'done',
    }
  }

  if (payload.step === 'error') {
    const prevSteps = current?.steps ?? []
    const steps: ProgressStep[] = [
      ...prevSteps.map((s) =>
        s.status === 'active' ? { ...s, status: 'error' as const } : s,
      ),
      {
        key: 'error',
        label: EMAIL_PROGRESS_STEP_LABELS.error ?? 'Error',
        status: 'error',
      },
    ]
    return {
      emailDate,
      id,
      label,
      processedAt: nowIso(),
      steps,
      status: 'error',
    }
  }

  const stepIdx = STEP_ORDER.indexOf(payload.step)
  const steps: ProgressStep[] =
    stepIdx >= 0
      ? STEP_ORDER.slice(0, stepIdx + 1).map((key, i) => {
          const isLast = i === stepIdx
          let stepStatus: ProgressStep['status'] = 'done'
          if (isLast && !TERMINAL_STEPS.has(payload.step)) {
            stepStatus = 'active'
          }
          return {
            key,
            label: EMAIL_PROGRESS_STEP_LABELS[key] ?? key,
            status: stepStatus,
          }
        })
      : [
          {
            key: payload.step,
            label: EMAIL_PROGRESS_STEP_LABELS[payload.step] ?? payload.step,
            status: TERMINAL_STEPS.has(payload.step) ? 'done' : 'active',
          },
        ]

  const status: string = TERMINAL_STEPS.has(payload.step) ? 'done' : 'active'

  return {
    emailDate,
    id,
    label,
    processedAt: nowIso(),
    steps,
    status,
  }
}
