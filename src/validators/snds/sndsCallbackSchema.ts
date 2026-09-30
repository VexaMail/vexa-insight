import { z } from 'zod'

/** Body of the SNDS callback endpoint: the address the sign-in ended on. */
export const sndsCallbackSchema = z.object({
  redirectUrl: z
    .string({ error: 'redirectUrl must be a string' })
    .min(1, { error: 'Paste the address the browser ended on.' })
    .max(8192, { error: 'redirectUrl is too long' }),
})
