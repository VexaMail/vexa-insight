import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpAuthCheckRowProps } from '@/types/ips'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { IpAuthCheckIcon } from './IpAuthCheckIcon'
import { IpVerdictPill } from './IpVerdictPill'

/** One authentication fact: its mark, name, rate, verdict and explanation. */
export function IpAuthCheckRow({
  check,
  total,
  href,
}: Readonly<IpAuthCheckRowProps>) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        className="group hover:bg-accent/50 flex items-start gap-3 px-4 py-3 transition-colors duration-150"
      >
        <IpAuthCheckIcon tone={check.verdict.tone} className="mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="text-foreground text-sm font-medium">
              {check.label}
            </span>
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'font-mono text-sm font-semibold tabular-nums',
                  STATUS_TONE_TEXT_CLASSES[check.verdict.tone],
                )}
                title={`${check.count.toLocaleString('en-US')} of ${total.toLocaleString('en-US')} messages`}
              >
                {check.rate.toFixed(1)}%
              </span>
              <IpVerdictPill verdict={check.verdict} />
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {check.detail}
          </p>
        </div>
        <ChevronRight
          className="text-muted-foreground group-hover:text-primary mt-0.5 h-4 w-4 shrink-0 transition-colors"
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}
