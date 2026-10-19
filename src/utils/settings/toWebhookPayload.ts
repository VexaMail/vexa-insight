import type { AdminApiResult, WebhookFormState } from '@/types/settings'

/**
 * The webhook request body. The secret is sent only when a new one was typed
 * or the stored one is being removed, so an edit never overwrites it with the
 * masked value the list shows.
 */
export function toWebhookPayload(
  form: WebhookFormState,
): AdminApiResult<unknown> {
  if (form.name.trim() === '')
    return { ok: false, message: 'Name is required.' }
  if (form.events.length === 0) {
    return { ok: false, message: 'Choose at least one event.' }
  }
  const secret = form.secret.trim()
  if (secret !== '' && secret.length < 16) {
    return { ok: false, message: 'The secret needs at least 16 characters.' }
  }
  const body = {
    name: form.name.trim(),
    url: form.url.trim(),
    enabled: form.enabled,
    events: form.events,
    ...(secret === '' ? {} : { secret }),
    ...(form.clearSecret && secret === '' ? { secret: null } : {}),
  }
  return { ok: true, data: body }
}
