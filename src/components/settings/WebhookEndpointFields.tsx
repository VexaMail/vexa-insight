import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { EnabledField } from './EnabledField'
import type { WebhookFieldsProps } from './WebhookFieldsProps'

/** Name, target URL and the enabled switch of a webhook endpoint. */
export function WebhookEndpointFields({
  form,
  setForm,
}: Readonly<WebhookFieldsProps>) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="webhook-name" className={SETTINGS_LABEL_CLASS_NAME}>
          Name
        </label>
        <Input
          id="webhook-name"
          required
          maxLength={120}
          value={form.name}
          placeholder="Ops alerts"
          className={SETTINGS_INPUT_CLASS_NAME}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }}
        />
      </div>
      <div>
        <label htmlFor="webhook-url" className={SETTINGS_LABEL_CLASS_NAME}>
          URL
        </label>
        <Input
          id="webhook-url"
          type="url"
          required
          value={form.url}
          placeholder="https://hooks.example.com/vexa"
          className={`${SETTINGS_INPUT_CLASS_NAME} font-mono`}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, url: e.target.value }))
          }}
        />
      </div>
      <EnabledField
        checked={form.enabled}
        offLabel="Paused: nothing is sent"
        onChange={(enabled) => {
          setForm((prev) => ({ ...prev, enabled }))
        }}
      />
    </div>
  )
}
