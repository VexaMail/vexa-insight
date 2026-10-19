'use client'

import { SETTINGS_CONTROL_CLASS_NAME } from '@/constants/settings'
import type { AIProviderId } from '@/types/ai'
import { AI_PROVIDERS } from './aiProviders'
import type { AiProviderSelectProps } from './AiProviderSelectProps'

export function AiProviderSelect({ value, onChange }: AiProviderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="ai-provider"
        className="text-foreground text-sm font-medium"
      >
        Provider
      </label>
      <select
        id="ai-provider"
        className={SETTINGS_CONTROL_CLASS_NAME}
        value={value ?? ''}
        onChange={(e) => {
          const providerId = e.target.value
          onChange(providerId === '' ? null : (providerId as AIProviderId))
        }}
      >
        <option value="">Select a provider…</option>
        {AI_PROVIDERS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  )
}
