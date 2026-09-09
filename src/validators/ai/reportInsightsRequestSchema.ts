import { REPORT_ID_REQUIRED_MESSAGE } from '@/constants/ai'
import { z } from 'zod'

/**
 * Body of the AI report insights endpoint.
 */
export const reportInsightsRequestSchema = z.object(
  {
    reportId: z
      .number({ error: REPORT_ID_REQUIRED_MESSAGE })
      .int({ error: REPORT_ID_REQUIRED_MESSAGE })
      .min(1, { error: REPORT_ID_REQUIRED_MESSAGE }),
  },
  { error: REPORT_ID_REQUIRED_MESSAGE },
)
