import { IconTile } from '@/components/ui'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpAuthCheckRowProps } from '@/types/ips'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { IpAuthCheckIcon } from './IpAuthCheckIcon'
import { IpVerdictPill } from './IpVerdictPill'

/** One authentication fact: icon, name, verdict, rate and explanation. */
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
        <IconTile tone={check.verdict.tone} size="sm" className="mt-0.5">
          <IpAuthCheckIcon checkKey={check.key} tone={check.verdict.tone} />
        </IconTile>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground text-sm font-medium">
              {check.label}
            </span>
            <IpVerdictPill verdict={check.verdict} />
          </div>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {check.detail}
          </p>
        </div>
        <span
          className={cn(
            'mt-1 shrink-0 font-mono text-base font-semibold tabular-nums',
            STATUS_TONE_TEXT_CLASSES[check.verdict.tone],
          )}
          title={`${check.count.toLocaleString()} of ${total.toLocaleString()} messages`}
        >
          {check.rate.toFixed(1)}%
        </span>
        <ChevronRight
          className="text-muted-foreground group-hover:text-primary mt-1.5 h-4 w-4 shrink-0 transition-colors"
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}
