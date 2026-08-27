import { differenceInHours } from 'date-fns'

export function getDurationHours(params: {
  days: number
  from: Date | undefined
  to: Date | undefined
  now: Date
}): number {
  if (params.from && params.to) {
    return differenceInHours(params.to, params.from, {
      roundingMethod: 'floor',
    })
  }

  if (params.from) {
    return differenceInHours(params.now, params.from, {
      roundingMethod: 'floor',
    })
  }

  return params.days * 24
}
