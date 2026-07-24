import { z } from 'zod'

export const updateUserInputSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  allowedDomains: z.array(z.string()).optional(),
})
