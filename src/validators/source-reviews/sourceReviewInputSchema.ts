import { z } from 'zod'

/** Body of `PUT /api/v1/sources/reviews`; `DELETE` takes `ip` and `domain`. */
export const sourceReviewInputSchema = z.object({
  ip: z.union([z.ipv4(), z.ipv6()]),
  domain: z.string().min(1).max(253),
  verdict: z.enum(['legitimate', 'forwarder', 'unauthorized']),
  note: z.string().trim().max(2000).optional(),
})
