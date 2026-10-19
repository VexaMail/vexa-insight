'use client'

import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import type { IngestionIntervalFieldProps } from './IngestionIntervalFieldProps'

export function IngestionIntervalField({
  value,
  onChange,
}: IngestionIntervalFieldProps) {
  return (
    <div>
      <label
        htmlFor="settings-ingestion-interval"
        className={SETTINGS_LABEL_CLASS_NAME}
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
        className={SETTINGS_INPUT_CLASS_NAME}
      />
    </div>
  )
}
