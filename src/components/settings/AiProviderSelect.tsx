'use client'

import type { AIProviderId } from '@/types/ai'
import { AI_PROVIDERS } from './aiProviders'
import type { AiProviderSelectProps } from './AiProviderSelectProps'

export function AiProviderSelect({ value, onChange }: AiProviderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ai-provider" className="text-sm font-medium">
        Provider
      </label>
      <select
        id="ai-provider"
        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
