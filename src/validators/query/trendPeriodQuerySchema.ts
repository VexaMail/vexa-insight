import { z } from 'zod'

/**
 * `period` bucketing for the trend endpoint. Strict: an unknown value is a 400
 * because it would otherwise reach `getTrendStats` as a bogus union member.
 */
export const trendPeriodQuerySchema = z
  .enum(['hour', 'day', 'week'], { error: 'period must be hour, day, or week' })
  .default('day')
