import type { SpfDkimBreakdown } from '@/types/reports'

export function emptySpfDkimBreakdown(): SpfDkimBreakdown {
  return { spfPass: 0, spfFail: 0, dkimPass: 0, dkimFail: 0 }
}
