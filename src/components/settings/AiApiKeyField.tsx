'use client'

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
      <label htmlFor="ai-api-key" className="text-sm font-medium">
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
        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
