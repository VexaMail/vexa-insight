import type { z } from 'zod'
import type { webhookEndpointInputSchema } from './webhookEndpointInputSchema'

export type WebhookEndpointInput = z.infer<typeof webhookEndpointInputSchema>
