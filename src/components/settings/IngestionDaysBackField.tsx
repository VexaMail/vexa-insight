'use client'

import { Input } from '@/components/ui'
import { DEFAULT_DAYS_BACK } from '@/utils/install'
import type { IngestionDaysBackFieldProps } from './IngestionDaysBackFieldProps'

export function IngestionDaysBackField({
  value,
  onChange,
}: IngestionDaysBackFieldProps) {
  return (
    <div>
      <label
        htmlFor="settings-ingestion-days"
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
        Days back
      </label>
      <Input
        id="settings-ingestion-days"
        type="number"
        min={1}
        max={365}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10)
          onChange(Number.isFinite(n) && n >= 1 ? n : DEFAULT_DAYS_BACK)
        }}
        className="bg-secondary border-border/50 text-xs"
      />
    </div>
  )
}
