import type { AppConfig } from '@/types/config'

export class ConfigCache {
  private static cached: AppConfig | null = null

  public static get(): AppConfig | null {
    return ConfigCache.cached
  }

  public static set(config: AppConfig): void {
    ConfigCache.cached = config
  }

  public static clear(): void {
    ConfigCache.cached = null
  }
}
