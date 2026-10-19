import type { AdminApiResult, AlertRuleFormState } from '@/types/settings'

/** The alert rule request body; numbers are checked the way the API checks them. */
export function toAlertRulePayload(
  form: AlertRuleFormState,
): AdminApiResult<unknown> {
  const threshold = Number(form.threshold)
  const windowDays = Number(form.windowDays)
  const minMessages = Number(form.minMessages)
  if (form.name.trim() === '')
    return { ok: false, message: 'Name is required.' }
  if (!(threshold > 0 && threshold <= 100)) {
    return { ok: false, message: 'Threshold must be above 0 and at most 100.' }
  }
  if (!Number.isInteger(windowDays) || windowDays < 1 || windowDays > 90) {
    return { ok: false, message: 'Window must be 1 to 90 days.' }
  }
  if (!Number.isInteger(minMessages) || minMessages < 1) {
    return { ok: false, message: 'Minimum messages must be a whole number.' }
  }
  const domain = form.domainName.trim()
  return {
    ok: true,
    data: {
      name: form.name.trim(),
      kind: form.kind,
      domainName: domain === '' ? null : domain,
      threshold,
      windowDays,
      minMessages,
      enabled: form.enabled,
    },
  }
}
