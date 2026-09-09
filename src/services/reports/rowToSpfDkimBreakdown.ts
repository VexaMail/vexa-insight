import type { SpfDkimBreakdown } from '@/types/reports'

/**
 * An aggregate over no rows yields nulls; they read as zero counts.
 */
export function rowToSpfDkimBreakdown(
  row: Partial<SpfDkimBreakdown> | undefined,
): SpfDkimBreakdown {
  return {
    spfPass: row?.spfPass ?? 0,
    spfFail: row?.spfFail ?? 0,
    dkimPass: row?.dkimPass ?? 0,
    dkimFail: row?.dkimFail ?? 0,
  }
}
