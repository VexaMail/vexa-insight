import { Check, TriangleAlert, X } from 'lucide-react'
import type { ToneIconProps } from './ToneIconProps'

/** Check for a pass, cross for a failure, warning sign for a partial result. */
export function ToneIcon({ tone }: Readonly<ToneIconProps>) {
  if (tone === 'success') return <Check strokeWidth={3} />
  if (tone === 'danger') return <X strokeWidth={3} />
  if (tone === 'warning') return <TriangleAlert strokeWidth={2.5} />
  return null
}
