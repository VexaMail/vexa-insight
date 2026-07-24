import type { z } from 'zod'
import type { geoipEnrichSchema } from './geoipEnrichSchema'

export type GeoipEnrichInput = z.infer<typeof geoipEnrichSchema>
