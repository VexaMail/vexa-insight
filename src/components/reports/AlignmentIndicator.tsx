import { AlertTriangle, Check } from 'lucide-react'
import type { AlignmentIndicatorProps } from './AlignmentIndicatorProps'

export function AlignmentIndicator({
  aligned,
  label,
}: Readonly<AlignmentIndicatorProps>) {
  if (aligned) {
    return (
      <Check
        className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
        aria-label={`${label} aligned`}
      >
        <title>{`${label}: Aligned — the sending domain matches the header domain`}</title>
      </Check>
    )
  }

  return (
    <AlertTriangle
      className="h-4 w-4 text-red-500 dark:text-red-400"
      aria-label={`${label} misaligned`}
    >
      <title>{`${label}: Misaligned — the sending domain does not match the header domain`}</title>
    </AlertTriangle>
  )
}
