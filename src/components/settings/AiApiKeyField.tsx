'use client'

import { SETTINGS_CONTROL_CLASS_NAME } from '@/constants/settings'
import type { AiApiKeyFieldProps } from './AiApiKeyFieldProps'

/** The stored key is never sent back, so a masked hint stands in for it. */
export function AiApiKeyField({
  value,
  apiKeyMasked,
  providerPlaceholder,
  onChange,
}: AiApiKeyFieldProps) {
  const hasStoredKey = apiKeyMasked != null && apiKeyMasked !== ''

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="ai-api-key"
        className="text-foreground text-sm font-medium"
      >
        API Key
      </label>
      <input
        id="ai-api-key"
        type="password"
        placeholder={
          apiKeyMasked
            ? `Current: ${apiKeyMasked}`
            : (providerPlaceholder ?? 'Enter API key...')
        }
        className={SETTINGS_CONTROL_CLASS_NAME}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
      {hasStoredKey && value === '' ? (
        <p className="text-muted-foreground text-xs">
          Leave blank to keep the existing key.
        </p>
      ) : null}
    </div>
  )
}
