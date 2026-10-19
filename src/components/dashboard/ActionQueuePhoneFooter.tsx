import { PHONE_QUEUE_LIMIT } from '@/constants/dashboard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ActionQueuePhoneFooterProps } from './ActionQueuePhoneFooterProps'

/** The phone queue's way to every issue it left out, when it left any. */
export function ActionQueuePhoneFooter({
  total,
}: Readonly<ActionQueuePhoneFooterProps>) {
  if (total <= PHONE_QUEUE_LIMIT) return null
  return (
    <div className="px-3 pt-2 pb-3 sm:hidden">
      <Link
        href="/issues"
        className="border-border text-foreground hover:bg-accent focus-visible:ring-ring active:bg-accent/80 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        View all {total} issues
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </div>
  )
}
