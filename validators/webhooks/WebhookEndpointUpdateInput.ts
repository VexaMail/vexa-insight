import type { z } from 'zod'
import type { webhookEndpointUpdateSchema } from './webhookEndpointUpdateSchema'

export type WebhookEndpointUpdateInput = z.infer<
  typeof webhookEndpointUpdateSchema
>
