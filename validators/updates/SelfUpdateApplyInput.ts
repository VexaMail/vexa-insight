import type { z } from 'zod'
import type { selfUpdateApplySchema } from './selfUpdateApplySchema'

export type SelfUpdateApplyInput = z.infer<typeof selfUpdateApplySchema>
