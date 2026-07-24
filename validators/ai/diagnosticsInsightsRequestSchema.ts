import { z } from 'zod'

/**
 * Body of the AI diagnostics insights endpoint. The date range is optional and
 * is converted to Date objects by the route, so only its type is checked here.
 */
export const diagnosticsInsightsRequestSchema = z.object({
  domainName: z.string().min(1),
  domainId: z.number().min(1),
  startDate: z.string().nullish(),
  endDate: z.string().nullish(),
})
