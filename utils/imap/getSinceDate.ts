/**
 * Returns the "since" date for IMAP search: epoch if days <= 0, otherwise today minus days.
 */
import { subDays } from 'date-fns'

export function getSinceDate(days: number): Date {
  if (days <= 0) return new Date(2000, 0, 1)
  return subDays(new Date(), days)
}
