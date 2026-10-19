import type {
  FailingSourceAccumulator,
  SourcePeriodRow,
} from '@/types/dashboard'

/** Adds one domain's row to an IP's running summary. */
export function addSourceRow(
  entry: FailingSourceAccumulator | undefined,
  row: SourcePeriodRow,
): FailingSourceAccumulator {
  const base = entry ?? {
    ip: row.ip,
    countryCode: row.countryCode,
    exampleDomain: row.domainName,
    exampleFailed: -1,
    domainCount: 0,
    total: 0,
    failed: 0,
  }
  const isExample = row.currentFailed > base.exampleFailed
  return {
    ...base,
    domainCount: base.domainCount + 1,
    total: base.total + row.currentTotal,
    failed: base.failed + row.currentFailed,
    exampleDomain: isExample ? row.domainName : base.exampleDomain,
    exampleFailed: isExample ? row.currentFailed : base.exampleFailed,
  }
}
