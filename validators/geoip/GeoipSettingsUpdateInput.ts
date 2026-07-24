import type { z } from 'zod'
import type { geoipSettingsUpdateSchema } from './geoipSettingsUpdateSchema'

export type GeoipSettingsUpdateInput = z.infer<typeof geoipSettingsUpdateSchema>
