import type { AppConfig } from '@/types/config'

import { ConfigCache } from './ConfigCache'

export function getCached(): AppConfig | null {
  return ConfigCache.get()
}
