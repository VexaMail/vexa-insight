import type { ReportSource } from '@/types/reports'

/** Distinct IPs across a report's source rows (one IP can span several rows). */
export function countDistinctSourceIps(sources: ReportSource[]): number {
  return new Set(sources.map((source) => source.ip)).size
}
