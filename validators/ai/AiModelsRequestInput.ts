import type { z } from 'zod'
import type { aiModelsRequestSchema } from './aiModelsRequestSchema'

export type AiModelsRequestInput = z.infer<typeof aiModelsRequestSchema>
