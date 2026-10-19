'use client'

import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import type { IpHostnameNumberFieldProps } from './IpHostnameNumberFieldProps'

/** Labelled numeric setting of the IP-to-hostname lookup section. */
export function IpHostnameNumberField({
  id,
  label,
  min,
  max,
  step,
  value,
  fallback,
  onCommit,
}: IpHostnameNumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={SETTINGS_LABEL_CLASS_NAME}>
        {label}
      </label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          onCommit(parseInt(e.target.value) || fallback)
        }}
        className={SETTINGS_INPUT_CLASS_NAME}
      />
    </div>
  )
}
