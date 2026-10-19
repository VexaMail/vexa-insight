import { z } from 'zod'

/** Body of `POST /api/v1/domains/{id}/dns/spf-plan`: the record to count. */
export const spfPlanInputSchema = z.object({
  record: z
    .string()
    .trim()
    .max(2048)
    .regex(/^v=spf1(?:\s|$)/i, 'An SPF record starts with v=spf1'),
})
