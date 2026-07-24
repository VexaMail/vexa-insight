import type { z } from 'zod'
import type { aiSettingsUpdateSchema } from './aiSettingsUpdateSchema'

export type AiSettingsUpdateInput = z.infer<typeof aiSettingsUpdateSchema>
