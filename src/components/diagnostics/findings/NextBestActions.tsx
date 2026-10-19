import { Panel } from '@/components/ui'
import {
  diagnosticsTabHref,
  guideAnchorId,
  pickNextBestActions,
} from '@/utils/diagnostics'
import { Target } from 'lucide-react'
import Link from 'next/link'
import { NextBestActionItem } from './NextBestActionItem'
import type { NextBestActionsProps } from './NextBestActionsProps'

/** The top three runbook items, each linking to its full guide. */
export function NextBestActions({
  guides,
  base,
}: Readonly<NextBestActionsProps>) {
  const actions = pickNextBestActions(guides)
  return (
    <Panel
      flush
      icon={<Target />}
      title="Next best actions"
      description="From the runbook: DNS state plus the report data in this window"
      actions={
        <Link
          href={diagnosticsTabHref({ ...base, tab: 'runbook' })}
          className="text-primary text-xs font-medium whitespace-nowrap hover:underline print:hidden"
        >
          Full runbook
        </Link>
      }
    >
      {actions.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          Nothing to fix from DNS or the report data in this window.
        </p>
      ) : (
        <ol className="divide-border divide-y">
          {actions.map((guide, index) => (
            <NextBestActionItem
              key={guide.id}
              guide={guide}
              position={index + 1}
              href={diagnosticsTabHref({
                ...base,
                tab: 'runbook',
                anchor: guideAnchorId(guide.id),
              })}
            />
          ))}
        </ol>
      )}
    </Panel>
  )
}
