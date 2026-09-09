import type { BackfillResult } from './BackfillResult'

export type BackfillReportCounts = Pick<BackfillResult, 'processed' | 'skipped'>
