import { StatusPill } from '@/components/ui'
import type { IpEventStepProps } from '@/types/ips'
import { verdictPillVariant } from '@/utils/ui'

/** One evaluation step of an event: SPF, DKIM or DMARC. */
export function IpEventStep({
  label,
  tone,
  verdict,
  children,
}: Readonly<IpEventStepProps>) {
  return (
    <li className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
      <span className="text-foreground w-12 shrink-0 text-xs font-semibold">
        {label}
      </span>
      <StatusPill tone={tone} variant={verdictPillVariant(tone)}>
        {verdict}
      </StatusPill>
      {children ? (
        <span className="text-muted-foreground min-w-0 text-xs break-words">
          {children}
        </span>
      ) : null}
    </li>
  )
}
