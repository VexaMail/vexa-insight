import { z } from 'zod'

export const createUserInputSchema = z.object({
  username: z
    .string({ error: 'Username and password are required' })
    .min(1, { message: 'Username and password are required' }),
  password: z
    .string({ error: 'Username and password are required' })
    .min(1, { message: 'Username and password are required' }),
  role: z.string().optional(),
  // See updateUserInputSchema: an empty allow-list means deny-all, never
  // "unrestricted", so it is a validation error rather than a stored value.
  allowedDomains: z
    .array(z.string())
    .min(1, {
      message:
        'Specify at least one allowed domain, or omit the field for all domains',
    })
    .optional(),
})
