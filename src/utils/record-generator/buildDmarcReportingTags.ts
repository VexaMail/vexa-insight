import type { DmarcRecordOptions } from '@/types/record-generator'
import { toMailtoList } from './toMailtoList'

/** The `rua`, `ruf` and `fo` tags; `fo` only makes sense with a `ruf`. */
export function buildDmarcReportingTags(options: DmarcRecordOptions): string[] {
  const tags: string[] = []
  const rua = toMailtoList(options.rua)
  if (rua) tags.push(`rua=${rua}`)
  const ruf = toMailtoList(options.ruf ?? [])
  if (ruf) tags.push(`ruf=${ruf}`)
  if (ruf && options.reportAnyFailure) tags.push('fo=1')
  return tags
}
