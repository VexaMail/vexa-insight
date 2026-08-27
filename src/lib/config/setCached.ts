import type { AppConfig } from '@/types/config'

import { configCacheState } from './configCacheState'

export function setCached(config: AppConfig): void {
  configCacheState.cached = config
}
