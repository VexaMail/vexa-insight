import { fromDateForDaysParam, parseLenientDate } from '@/utils/dates'
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
    const from = parseLenientDate(params.from)
    return {
      from: from ?? (params.to ? undefined : fromDateForDaysParam(params.days)),
      to: parseLenientDate(params.to),
    }
  })
