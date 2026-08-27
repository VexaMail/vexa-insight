import type { AppConfig } from '@/types/config'

import { configCacheState } from './configCacheState'

export function getCached(): AppConfig | null {
  return configCacheState.cached
}
