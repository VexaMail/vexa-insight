'use client'

import type { EnvironmentSelectProps } from './EnvironmentSelectProps'
import type { EnvironmentType } from './EnvironmentType'

export function EnvironmentSelect({ value, onChange }: EnvironmentSelectProps) {
  return (
    <div>
      <label
        htmlFor="settings-environment"
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
        Environment
      </label>
      <select
        id="settings-environment"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as EnvironmentType)
        }}
        className="bg-secondary border-border/50 text-foreground h-9 w-full rounded-md border px-3 text-xs"
      >
        <option value="development">development</option>
        <option value="staging">staging</option>
        <option value="production">production</option>
      </select>
    </div>
  )
}
