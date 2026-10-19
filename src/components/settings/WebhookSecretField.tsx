import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { WebhookClearSecretToggle } from './WebhookClearSecretToggle'
import type { WebhookFieldsProps } from './WebhookFieldsProps'

/**
 * A new signing secret. The stored one is never sent to the browser, so the
 * field starts empty and an empty field keeps it.
 */
export function WebhookSecretField({
  form,
  setForm,
}: Readonly<WebhookFieldsProps>) {
  return (
    <div>
      <label htmlFor="webhook-secret" className={SETTINGS_LABEL_CLASS_NAME}>
        Signing secret
      </label>
      <Input
        id="webhook-secret"
        type="password"
        autoComplete="new-password"
        minLength={16}
        maxLength={256}
        value={form.secret}
        disabled={form.clearSecret}
        placeholder={
          form.hasSecret
            ? '•••••••• stored; type to replace'
            : 'Optional, 16 characters or more'
        }
        className={`${SETTINGS_INPUT_CLASS_NAME} font-mono`}
        onChange={(e) => {
          setForm((prev) => ({ ...prev, secret: e.target.value }))
        }}
      />
      <p className="text-muted-foreground mt-1.5 text-xs">
        Signs the body as{' '}
        <code className="font-mono">X-Vexa-Signature: sha256=…</code>; leave
        empty to {form.hasSecret ? 'keep the stored secret' : 'send unsigned'}.
      </p>
      <WebhookClearSecretToggle form={form} setForm={setForm} />
    </div>
  )
}
