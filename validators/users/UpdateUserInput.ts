import type { z } from 'zod'
import type { updateUserInputSchema } from './updateUserInputSchema'

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>
