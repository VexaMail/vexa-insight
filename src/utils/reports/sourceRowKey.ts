import type { ReportSource } from '@/types/reports'

/** Stable React key of a source row: one IP can span several result groups. */
export function sourceRowKey(source: ReportSource): string {
  return [
    source.ip,
    source.spfAuthResult,
    source.spfResult,
    source.dkimResult,
    String(source.spfAligned),
    String(source.dkimAligned),
    source.disposition,
  ].join('|')
}
