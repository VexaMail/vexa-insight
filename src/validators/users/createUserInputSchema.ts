import { CREDENTIALS_REQUIRED_MESSAGE } from '@/constants/users'
import { z } from 'zod'

export const createUserInputSchema = z.object({
  username: z
    .string({ error: CREDENTIALS_REQUIRED_MESSAGE })
    .min(1, { message: CREDENTIALS_REQUIRED_MESSAGE }),
  password: z
    .string({ error: CREDENTIALS_REQUIRED_MESSAGE })
    .min(1, { message: CREDENTIALS_REQUIRED_MESSAGE }),
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
