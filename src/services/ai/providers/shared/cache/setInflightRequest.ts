import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'
import { providerModelInflightStore } from './providerModelInflightStore'

/**
 * Registers an in-flight promise and cleans it up on settlement.
 */
export function setInflightRequest(
  key: string,
  promise: Promise<ProviderModelInfo[]>,
): void {
  providerModelInflightStore.set(key, promise)

  const cleanup = async (): Promise<void> => {
    try {
      await promise
    } catch {
      // Cleanup regardless of success or failure
    } finally {
      providerModelInflightStore.delete(key)
    }
  }

  void cleanup()
}
