import type { SpfDkimBreakdown } from '@/types/reports'

export const emptySpfDkimBreakdown: SpfDkimBreakdown = {
  spfPass: 0,
  spfFail: 0,
  dkimPass: 0,
  dkimFail: 0,
}
