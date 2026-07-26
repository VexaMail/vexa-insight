import { z } from 'zod'

export const updateUserInputSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  // Omit the field (or send null) to lift the restriction. An empty array is
  // rejected rather than stored: `getAllowedDomainIds` reads it as deny-all,
  // which is almost never what an admin meant, and the modal already blocks it.
  allowedDomains: z
    .array(z.string())
    .min(1, {
      message:
        'Specify at least one allowed domain, or omit the field for all domains',
    })
    .optional(),
})
