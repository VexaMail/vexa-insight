import { diagnosticsOverviewBatchSize } from '@/constants/diagnostics'
import { z } from 'zod'

/** Body of `POST /api/v1/diagnostics/overview/refresh`: one batch of domain ids. */
export const diagnosticsOverviewRefreshSchema = z.object({
  domainIds: z
    .array(z.number().int().min(1))
    .min(1)
    .max(diagnosticsOverviewBatchSize),
})
