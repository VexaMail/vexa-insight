import { z } from 'zod'

/** Body of `POST /api/v1/admin/alert-rules`; `PATCH` takes any subset. */
export const alertRuleInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  kind: z.enum(['compliance_drop', 'compliance_below']),
  domainName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1)
    .max(253)
    .nullable()
    .default(null),
  threshold: z.number().gt(0).max(100),
  windowDays: z.number().int().min(1).max(90).default(7),
  minMessages: z.number().int().min(1).max(10_000_000).default(100),
  enabled: z.boolean().default(true),
})
