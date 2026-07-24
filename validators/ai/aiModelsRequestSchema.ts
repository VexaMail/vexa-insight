import { z } from 'zod'

export const aiModelsRequestSchema = z.object({
  providerId: z.enum(['anthropic', 'gemini', 'openai', 'openrouter'], {
    error: 'A valid providerId is required',
  }),
  apiKey: z.string().optional(),
})
