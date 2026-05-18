import { ALL_WEBHOOK_EVENTS } from '@/types/notifications'
import { z } from 'zod'

export const webhookEndpointInputSchema = z.object({
  name: z.string().min(1).max(120),
  url: z
    .url()
    .max(2048)
    .refine(
      (u) => {
        try {
          const p = new URL(u).protocol
          return p === 'https:' || p === 'http:'
        } catch {
          return false
        }
      },
      { message: 'URL must use http or https' },
    ),
  enabled: z.boolean().default(true),
  events: z.array(z.enum(ALL_WEBHOOK_EVENTS as [string, ...string[]])).min(1),
  secret: z.string().min(16).max(256).nullable().optional(),
})
