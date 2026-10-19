import { defaultMtaStsMaxAge } from '@/constants/diagnostics'
import type { MtaStsGeneratorFields } from '@/types/diagnostics'
import type { MtaStsPolicyOptions } from '@/types/record-generator'
import { splitList } from './splitList'
import { toMtaStsMode } from './toMtaStsMode'

/** The MTA-STS form as policy builder options. */
export function mtaStsOptionsFromFields(
  fields: MtaStsGeneratorFields,
): MtaStsPolicyOptions {
  const maxAge = Number.parseInt(fields.maxAge, 10)
  return {
    mode: toMtaStsMode(fields.mode),
    mx: splitList(fields.mx),
    maxAge: Number.isNaN(maxAge) ? defaultMtaStsMaxAge : maxAge,
  }
}
