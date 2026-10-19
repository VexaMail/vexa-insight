'use client'

import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
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
        className={SETTINGS_LABEL_CLASS_NAME}
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
        className={SETTINGS_INPUT_CLASS_NAME}
      />
    </div>
  )
}
