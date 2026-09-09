import type { aiSettingsUpdateSchema } from '@/validators/ai'
import type { z } from 'zod'

export type AiSettingsUpdateInput = z.infer<typeof aiSettingsUpdateSchema>
