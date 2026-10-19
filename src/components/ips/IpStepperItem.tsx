import { IP_VERDICT_ICONS, STEP_RING_CLASSES } from '@/constants/ips'
import { cn } from '@/lib/utils'
import type { IpStepperItemProps } from '@/types/ips'
import { FileText, Mail } from 'lucide-react'
import { IpStepTitle } from './IpStepTitle'

/** One stage of an event: its marker on the rail, title, result and detail. */
export function IpStepperItem({ step }: Readonly<IpStepperItemProps>) {
  const Verdict = IP_VERDICT_ICONS[step.tone]
  const Icon =
    step.kind === 'received'
      ? Mail
      : step.kind === 'report'
        ? FileText
        : Verdict
  return (
    <li className="before:bg-border relative flex gap-3 pb-4 before:absolute before:top-9 before:bottom-0 before:left-[17px] before:w-px last:pb-0 last:before:hidden">
      <span
        aria-hidden
        className={cn(
          'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 [&_svg]:h-4 [&_svg]:w-4',
          STEP_RING_CLASSES[step.tone],
        )}
      >
        <Icon />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <IpStepTitle step={step} />
        {step.lines.map((line) => (
          <p
            key={line}
            className="text-muted-foreground mt-0.5 text-xs break-words"
          >
            {line}
          </p>
        ))}
      </div>
      {step.at ? (
        <time
          className="text-muted-foreground shrink-0 pt-1 text-right text-xs"
          title="Start of the report window"
        >
          {step.at.date}
          <span className="block font-mono">{step.at.time}</span>
        </time>
      ) : null}
    </li>
  )
}
