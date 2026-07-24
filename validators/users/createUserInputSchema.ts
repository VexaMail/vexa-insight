import { z } from 'zod'

export const createUserInputSchema = z.object({
  username: z
    .string({ error: 'Username and password are required' })
    .min(1, { message: 'Username and password are required' }),
  password: z
    .string({ error: 'Username and password are required' })
    .min(1, { message: 'Username and password are required' }),
  role: z.string().optional(),
  allowedDomains: z.array(z.string()).optional(),
})
