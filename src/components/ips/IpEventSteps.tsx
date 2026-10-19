import type { IpEventStepsProps } from '@/types/ips'
import { describeEventDkim, resultTone } from '@/utils/ips'
import { IpEventStep } from './IpEventStep'

/** SPF, DKIM and DMARC of one event, auth and alignment kept apart. */
export function IpEventSteps({ row, dmarc }: Readonly<IpEventStepsProps>) {
  const dkimAuth = row.dkimPassDomains ? 'pass' : 'fail'
  return (
    <ul className="mt-2 space-y-1.5">
      <IpEventStep
        label="SPF"
        tone={resultTone(row.spfAuthResult)}
        verdict={row.spfAuthResult}
      >
        {row.spfResult === 'pass' ? 'aligned' : 'not aligned'}
      </IpEventStep>
      <IpEventStep label="DKIM" tone={resultTone(dkimAuth)} verdict={dkimAuth}>
        {describeEventDkim(row)}
      </IpEventStep>
      <IpEventStep label="DMARC" tone={resultTone(dmarc)} verdict={dmarc} />
    </ul>
  )
}
