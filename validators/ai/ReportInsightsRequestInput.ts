import type { z } from 'zod'
import type { reportInsightsRequestSchema } from './reportInsightsRequestSchema'

export type ReportInsightsRequestInput = z.infer<
  typeof reportInsightsRequestSchema
>
