import type { MtaStsPolicyOptions } from '@/types/record-generator'

/** A form value as an MTA-STS mode; anything unknown reads as `testing`. */
export function toMtaStsMode(value: string): MtaStsPolicyOptions['mode'] {
  return value === 'enforce' || value === 'none' ? value : 'testing'
}
