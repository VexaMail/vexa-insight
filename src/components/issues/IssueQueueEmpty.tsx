import { EmptyState } from '@/components/ui'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import type { IssueQueueEmptyProps } from './IssueQueueEmptyProps'

/** Shown when the window derives no issue at all. */
export function IssueQueueEmpty({
  windowLabel,
}: Readonly<IssueQueueEmptyProps>) {
  return (
    <EmptyState className="flex flex-col items-center gap-2">
      <CircleCheck aria-hidden className="text-success h-6 w-6" />
      <span className="text-foreground font-medium">
        Nothing needs attention
      </span>
      <span>
        No ingestion problem, silent domain, compliance drop or new failing
        source, {windowLabel}. Widen the date range or review{' '}
        <Link href="/domains" className="text-primary hover:underline">
          Domains
        </Link>
        .
      </span>
    </EmptyState>
  )
}
