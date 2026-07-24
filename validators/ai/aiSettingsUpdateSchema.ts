import { z } from 'zod'

export const aiSettingsUpdateSchema = z.object({
  providerId: z
    .enum(['anthropic', 'gemini', 'openai', 'openrouter'], {
      error: 'Invalid AI provider',
    })
    .nullable()
    .optional(),
  apiKey: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
})
