import { format } from 'date-fns'

/** Absolute timestamp behind a relative age, for its tooltip. */
export function formatHealthTime(date: Date | null): string | undefined {
  return date ? format(date, 'yyyy-MM-dd HH:mm') : undefined
}
