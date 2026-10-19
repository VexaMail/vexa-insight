import type { BuildIpEventStepsParams, IpEventStepData } from '@/types/ips'
import { buildReceivedStep } from './buildReceivedStep'
import { buildReportStep } from './buildReportStep'
import { describeEventDkim } from './describeEventDkim'
import { resultTone } from './resultTone'

/**
 * One event as the stages a receiver went through: the mail arriving, SPF,
 * DKIM, the DMARC evaluation and the report it was published in.
 */
export function buildIpEventSteps(
  params: BuildIpEventStepsParams,
): IpEventStepData[] {
  const { row } = params
  const dkim = row.dkimPassDomains ? 'pass' : 'fail'
  const dmarc =
    row.spfResult === 'pass' || row.dkimResult === 'pass' ? 'pass' : 'fail'
  return [
    buildReceivedStep(params),
    {
      kind: 'spf',
      title: 'SPF authentication',
      tone: resultTone(row.spfAuthResult),
      verdict: row.spfAuthResult,
      lines: [
        row.spfResult === 'pass'
          ? 'Aligned with From'
          : 'Not aligned with From',
      ],
    },
    {
      kind: 'dkim',
      title: 'DKIM authentication',
      tone: resultTone(dkim),
      verdict: dkim,
      lines: [describeEventDkim(row)],
    },
    {
      kind: 'dmarc',
      title: 'DMARC evaluation',
      tone: resultTone(dmarc),
      verdict: dmarc,
      lines: [`Disposition ${row.disposition}`],
    },
    buildReportStep(row),
  ]
}
