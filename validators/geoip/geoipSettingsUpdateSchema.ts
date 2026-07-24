import { z } from 'zod'

export const geoipSettingsUpdateSchema = z.object({
  licenseKey: z.string({ error: 'licenseKey must be a string' }),
})
