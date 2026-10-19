import type { WebhookFieldsProps } from './WebhookFieldsProps'

/** Removes the stored signing secret on save; only shown when one exists. */
export function WebhookClearSecretToggle({
  form,
  setForm,
}: Readonly<WebhookFieldsProps>) {
  if (!form.hasSecret) return null
  return (
    <label
      htmlFor="webhook-clear-secret"
      className="mt-2 flex items-center gap-2 text-sm"
    >
      <input
        id="webhook-clear-secret"
        type="checkbox"
        checked={form.clearSecret}
        onChange={(e) => {
          const clearSecret = e.target.checked
          setForm((prev) => ({ ...prev, clearSecret, secret: '' }))
        }}
        className="accent-primary h-4 w-4"
      />
      Remove the stored secret
    </label>
  )
}
