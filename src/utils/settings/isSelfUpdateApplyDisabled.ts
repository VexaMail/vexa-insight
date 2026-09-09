import type { SelfUpdateApplyDisabledParams } from '@/types/settings'

/** The apply button is inert unless a key, a capable install and an update exist. */
export function isSelfUpdateApplyDisabled({
  isStarting,
  running,
  apiKey,
  canApply,
  updateAvailable,
}: SelfUpdateApplyDisabledParams): boolean {
  return (
    isStarting || running || !apiKey.trim() || !canApply || !updateAvailable
  )
}
