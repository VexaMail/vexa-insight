import { isValidUpdateRef } from '@/utils/updates'
import { z } from 'zod'

/**
 * Body of the self-update endpoint. The `ref` is optional: a missing,
 * unparsable or non-object body means "update to the latest release", so the
 * payload is normalised before validation and only a present `ref` is checked.
 */
export const selfUpdateApplySchema = z.preprocess(
  (value) =>
    value !== null && typeof value === 'object' && 'ref' in value
      ? { ref: value.ref }
      : { ref: null },
  z.object({
    ref: z
      .string({ error: 'ref must match vMAJOR.MINOR.PATCH' })
      .refine(isValidUpdateRef, { error: 'ref must match vMAJOR.MINOR.PATCH' })
      .nullish(),
  }),
)
