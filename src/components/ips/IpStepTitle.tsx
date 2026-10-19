import { StatusPill } from '@/components/ui'
import type { IpStepperItemProps } from '@/types/ips'
import Link from 'next/link'

/** A stage's title, linked when it has a page, and its result pill. */
export function IpStepTitle({ step }: Readonly<IpStepperItemProps>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-foreground text-sm font-medium break-words">
        {step.href ? (
          <Link href={step.href} className="hover:text-primary">
            {step.title}
          </Link>
        ) : (
          step.title
        )}
      </span>
      {step.verdict ? (
        <StatusPill tone={step.tone} variant="solid" className="uppercase">
          {step.verdict}
        </StatusPill>
      ) : null}
    </div>
  )
}
