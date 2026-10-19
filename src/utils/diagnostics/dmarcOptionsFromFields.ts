import type { DmarcGeneratorFields } from '@/types/diagnostics'
import type { DmarcRecordOptions } from '@/types/record-generator'
import { splitList } from './splitList'
import { toDmarcPolicy } from './toDmarcPolicy'

/** The DMARC form as builder options. */
export function dmarcOptionsFromFields(
  fields: DmarcGeneratorFields,
): DmarcRecordOptions {
  const percent = Number.parseInt(fields.percent, 10)
  return {
    policy: toDmarcPolicy(fields.policy),
    subdomainPolicy:
      fields.subdomainPolicy === 'inherit'
        ? undefined
        : toDmarcPolicy(fields.subdomainPolicy),
    percent: Number.isNaN(percent) ? undefined : Math.min(100, percent),
    rua: splitList(fields.rua),
    ruf: splitList(fields.ruf),
    strictDkim: fields.strictDkim,
    strictSpf: fields.strictSpf,
    reportAnyFailure: fields.reportAnyFailure,
  }
}
