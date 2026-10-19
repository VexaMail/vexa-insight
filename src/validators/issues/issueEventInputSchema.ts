import { z } from 'zod'

/** Body of `POST /api/v1/issues/events`. */
export const issueEventInputSchema = z
  .object({
    issueKey: z.string().min(1).max(300),
    action: z.enum(['acknowledge', 'snooze', 'reopen', 'resolve', 'note']),
    /** How long a snooze lasts, from now. */
    snoozeHours: z
      .number()
      .int()
      .min(1)
      .max(24 * 90)
      .optional(),
    note: z.string().trim().max(2000).optional(),
  })
  .refine((input) => input.action !== 'snooze' || input.snoozeHours, {
    message: 'snoozeHours is required to snooze',
  })
  .refine((input) => input.action !== 'note' || input.note, {
    message: 'note is required',
  })
