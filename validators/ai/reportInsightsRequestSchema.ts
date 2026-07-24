import { z } from 'zod'

/**
 * Body of the AI report insights endpoint.
 */
export const reportInsightsRequestSchema = z.object(
  {
    reportId: z
      .number({ error: 'Valid reportId is required.' })
      .min(1, { error: 'Valid reportId is required.' }),
  },
  { error: 'Valid reportId is required.' },
)
