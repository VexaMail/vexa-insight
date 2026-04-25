import type { AppConfig } from '@/types/config'

import { ConfigCache } from './ConfigCache'

export function setCached(config: AppConfig): void {
  ConfigCache.set(config)
}
