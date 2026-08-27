import { parseDays } from '../mappers/parseDays'

export function parseDateRangeParams(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  const days = parseDays(searchParams.days)

  let fromDate: Date | undefined
  let toDate: Date | undefined

  if (typeof searchParams.from === 'string') {
    const parsed = new Date(searchParams.from)
    if (!isNaN(parsed.getTime())) fromDate = parsed
  }
  if (typeof searchParams.to === 'string') {
    const parsed = new Date(searchParams.to)
    if (!isNaN(parsed.getTime())) toDate = parsed
  }

  return { days, fromDate, toDate }
}
