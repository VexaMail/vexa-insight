import { StatusPill } from '@/components/ui'
import { IP_VERDICT_ICONS, STEP_RING_CLASSES } from '@/constants/ips'
import { cn } from '@/lib/utils'
import type { IpStepperItemProps } from '@/types/ips'
import { FileText, Mail } from 'lucide-react'
import Link from 'next/link'

/** One stage of an event: its marker on the rail, title, result and detail. */
export function IpStepperItem({ step }: Readonly<IpStepperItemProps>) {
  const Verdict = IP_VERDICT_ICONS[step.tone]
  const Icon =
    step.kind === 'received'
      ? Mail
      : step.kind === 'report'
        ? FileText
        : Verdict
  const title = step.href ? (
    <Link href={step.href} className="hover:text-primary">
      {step.title}
    </Link>
  ) : (
    step.title
  )
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
      <div className="min-w-0 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-foreground text-sm font-medium break-words">
            {title}
          </span>
          {step.verdict ? (
            <StatusPill tone={step.tone} className="uppercase">
              {step.verdict}
            </StatusPill>
          ) : null}
        </div>
        {step.lines.map((line) => (
          <p
            key={line}
            className="text-muted-foreground mt-0.5 text-xs break-words"
          >
            {line}
          </p>
        ))}
      </div>
    </li>
  )
}
