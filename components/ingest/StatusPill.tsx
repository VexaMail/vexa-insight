'use client'

import type { StatusPillProps } from './StatusPillProps'
import { BASE_CLASS } from './baseClass'
import { DOT_VARIANT_CLASSES } from './dotVariantClasses'
import { VARIANT_CLASSES } from './variantClasses'

export default function StatusPill({
  status,
  text,
}: Readonly<StatusPillProps>) {
  return (
    <span
      className={`${BASE_CLASS} ${VARIANT_CLASSES[status] ?? VARIANT_CLASSES.pending}`}
      aria-label={`${text}: ${status}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${DOT_VARIANT_CLASSES[status] ?? DOT_VARIANT_CLASSES.pending}`}
      />
      {text}
    </span>
  )
}
