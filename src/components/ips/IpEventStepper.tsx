import type { IpEventStepperProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { buildIpEventSteps } from '@/utils/ips'
import { IpStepperItem } from './IpStepperItem'

/** One event as a vertical stepper, under the date it was reported for. */
export function IpEventStepper({
  row,
  ip,
  hostname,
}: Readonly<IpEventStepperProps>) {
  const observed = formatRelativeDate(row.observedAt)
  return (
    <section aria-label={`Event of ${observed.absolute}`}>
      <p className="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
        <span
          aria-hidden
          className="border-muted-foreground/60 h-2.5 w-2.5 rounded-full border"
        />
        <time>
          {observed.absolute} · {observed.relative}
        </time>
      </p>
      <ol className="flex flex-col">
        {buildIpEventSteps({ row, ip, hostname }).map((step) => (
          <IpStepperItem key={step.kind} step={step} />
        ))}
      </ol>
    </section>
  )
}
