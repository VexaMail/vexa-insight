'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { SNOOZE_OPTIONS } from '@/constants/dashboard'
import { Clock } from 'lucide-react'
import { IssueIconButton } from './IssueIconButton'
import type { IssueSnoozeMenuProps } from './IssueSnoozeMenuProps'

/** Snooze for a day or a week; the issue returns when the snooze runs out. */
export function IssueSnoozeMenu({
  action,
  issueTitle,
}: Readonly<IssueSnoozeMenuProps>) {
  return (
    <Popover
      open={action.isSnoozeMenuOpen}
      onOpenChange={action.setSnoozeMenuOpen}
    >
      <PopoverTrigger asChild>
        <IssueIconButton
          label={`Snooze: ${issueTitle}`}
          disabled={action.pending !== null}
        >
          <Clock aria-hidden />
        </IssueIconButton>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1">
        <p className="text-muted-foreground px-2 py-1.5 text-xs">Snooze for</p>
        {SNOOZE_OPTIONS.map((option) => (
          <button
            key={option.hours}
            type="button"
            className="hover:bg-accent focus-visible:bg-accent text-foreground flex h-9 w-full cursor-pointer items-center rounded-sm px-2 text-sm transition-colors focus-visible:outline-none"
            onClick={() => {
              action.act('snooze', option.hours)
            }}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
