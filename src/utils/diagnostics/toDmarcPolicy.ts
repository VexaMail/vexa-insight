import type { DmarcRecordOptions } from '@/types/record-generator'

/** A form value as a DMARC policy; anything unknown reads as `none`. */
export function toDmarcPolicy(value: string): DmarcRecordOptions['policy'] {
  return value === 'quarantine' || value === 'reject' ? value : 'none'
}
