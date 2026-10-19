import type { SpfGeneratorFields } from '@/types/diagnostics'
import type { SpfRecordOptions } from '@/types/record-generator'
import { splitList } from './splitList'

/** The SPF form as builder options. */
export function spfOptionsFromFields(
  fields: SpfGeneratorFields,
): SpfRecordOptions {
  return {
    includes: splitList(fields.includes),
    ip4: splitList(fields.ip4),
    ip6: splitList(fields.ip6),
    a: fields.a,
    mx: fields.mx,
    all: fields.all === 'fail' ? 'fail' : 'softfail',
  }
}
