import type { z } from 'zod'
import type { createUserInputSchema } from './createUserInputSchema'

export type CreateUserInput = z.infer<typeof createUserInputSchema>
