import { z } from 'zod'

/**
 * Body of the GeoIP enrichment endpoint. The raw string is forwarded to the
 * service untouched; only its presence is validated here.
 */
export const geoipEnrichSchema = z.object(
  {
    ip: z
      .string({ error: 'ip must be a valid string' })
      .refine((value) => value.trim().length > 0, {
        error: 'ip must be a valid string',
      }),
  },
  { error: 'ip must be a valid string' },
)
