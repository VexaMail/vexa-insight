'use client'

import type { TriggerPollApiKeyFieldProps } from './TriggerPollApiKeyFieldProps'

export function TriggerPollApiKeyField({
  value,
  onChange,
}: Readonly<TriggerPollApiKeyFieldProps>) {
  return (
    <div className="min-w-[200px] flex-1">
      <label
        htmlFor="trigger-poll-api-key"
        className="text-foreground mb-1 block text-sm font-medium"
      >
        API key
      </label>
      <input
        id="trigger-poll-api-key"
        type="password"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder="API key"
        className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:outline-none"
        autoComplete="off"
      />
    </div>
  )
}
