import { ConfigCache } from './ConfigCache'

export function invalidateConfigCache(): void {
  ConfigCache.clear()
}
