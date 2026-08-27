import type { SelfUpdateStatus } from '@/types/updates'
import { getSelfUpdateCapability } from './getSelfUpdateCapability'
import { readSelfUpdateLog } from './readSelfUpdateLog'

/**
 * Compose the public self-update status returned by `GET /apply-update`.
 */
export function getSelfUpdateStatus(): SelfUpdateStatus {
  return {
    capability: getSelfUpdateCapability(),
    log: readSelfUpdateLog(),
  }
}
