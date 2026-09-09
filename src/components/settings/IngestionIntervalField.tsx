'use client'

import { Input } from '@/components/ui'
import type { IngestionIntervalFieldProps } from './IngestionIntervalFieldProps'

export function IngestionIntervalField({
  value,
  onChange,
}: IngestionIntervalFieldProps) {
  return (
    <div>
      <label
        htmlFor="settings-ingestion-interval"
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
        Interval (minutes)
      </label>
      <Input
        id="settings-ingestion-interval"
        type="number"
        min={1}
        max={1440}
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.target.value, 10) || 60)
        }}
        className="bg-secondary border-border/50 text-xs"
      />
    </div>
  )
}
