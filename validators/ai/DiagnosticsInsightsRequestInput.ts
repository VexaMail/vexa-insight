import type { z } from 'zod'
import type { diagnosticsInsightsRequestSchema } from './diagnosticsInsightsRequestSchema'

export type DiagnosticsInsightsRequestInput = z.infer<
  typeof diagnosticsInsightsRequestSchema
>
