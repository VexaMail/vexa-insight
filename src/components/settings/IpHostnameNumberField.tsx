'use client'

import { Input } from '@/components/ui'
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
      <label
        htmlFor={id}
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
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
        className="bg-secondary border-border/50 text-xs"
      />
    </div>
  )
}
