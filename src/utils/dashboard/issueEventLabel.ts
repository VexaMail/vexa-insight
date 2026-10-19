import type { IssueEvent } from '@/types/issues'
import { formatDateTime } from './formatters/formatDateTime'

/** "Acknowledged", "Snoozed until Oct 26, 2026, 3:00 AM", "Reopened"... */
export function issueEventLabel(event: IssueEvent): string {
  switch (event.action) {
    case 'acknowledge': {
      return 'Acknowledged'
    }
    case 'snooze': {
      return event.snoozedUntil
        ? `Snoozed until ${formatDateTime(event.snoozedUntil * 1000)}`
        : 'Snoozed'
    }
    case 'reopen': {
      return 'Reopened'
    }
    case 'resolve': {
      return 'Marked resolved'
    }
    case 'note': {
      return 'Note added'
    }
  }
}
