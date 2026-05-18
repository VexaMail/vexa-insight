import { upsertUpdateState } from './upsertUpdateState'

/**
 * Persist whether automatic update checks are allowed at the DB level.
 * Note: the env-level VEXA_UPDATE_CHECK_ENABLED flag still wins when set to false.
 */
export function setUpdateCheckEnabled(enabled: boolean): void {
  upsertUpdateState({ enabled })
}
