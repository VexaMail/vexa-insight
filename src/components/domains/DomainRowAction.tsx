'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import type { DomainRowActionProps } from './DomainRowActionProps'

/** Icon link in the domains table row, kept out of the row click handler. */
export function DomainRowAction({
  href,
  title,
  icon,
  onNavigate,
}: DomainRowActionProps) {
  return (
    <Link
      href={href}
      title={title}
      onClick={(e) => {
        e.stopPropagation()
        onNavigate?.()
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground h-7 w-7"
      >
        {icon}
      </Button>
    </Link>
  )
}
