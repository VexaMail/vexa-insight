import { configCacheState } from './configCacheState'

export function invalidateConfigCache(): void {
  configCacheState.cached = null
}
