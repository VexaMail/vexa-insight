import { getFromDateFromDays } from '@/utils/dates'
import { z } from 'zod'

/**
 * Shared `from` / `to` / `days` date-range query params.
 *
 * Lenient on purpose: unparsable dates become `undefined` instead of a 400 so a
 * stale dashboard link keeps working. `days` is only used as a fallback when
 * neither `from` nor `to` was supplied, and the literal `custom` is ignored.
 */
export const dateRangeQuerySchema = z
  .object({
    from: z.string().nullish(),
    to: z.string().nullish(),
    days: z.string().nullish(),
  })
  .transform((params) => {
    const rawFrom = params.from ? new Date(params.from) : undefined
    const rawTo = params.to ? new Date(params.to) : undefined
    let from = rawFrom && !Number.isNaN(rawFrom.getTime()) ? rawFrom : undefined

    if (!from && !rawTo && params.days && params.days !== 'custom') {
      const days = Number.parseInt(params.days, 10)
      if (!Number.isNaN(days) && days > 0 && days < 9999) {
        from = getFromDateFromDays(new Date(), days)
      }
    }

    return {
      from,
      to: rawTo && !Number.isNaN(rawTo.getTime()) ? rawTo : undefined,
    }
  })
