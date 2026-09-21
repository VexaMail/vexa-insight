'use client'

import { Bar } from 'recharts'

/** The four daily series of the ingestion activity chart. */
export function IngestActivityBars() {
  return (
    <>
      <Bar
        dataKey="processed"
        name="Emails processed"
        fill="hsl(var(--chart-spf))"
        radius={[3, 3, 0, 0]}
      />
      <Bar
        dataKey="ingested"
        name="Reports ingested"
        fill="hsl(var(--chart-pass))"
        radius={[3, 3, 0, 0]}
      />
      <Bar
        dataKey="errors"
        name="Errors"
        fill="hsl(var(--chart-fail))"
        radius={[3, 3, 0, 0]}
      />
      <Bar
        dataKey="failedRuns"
        name="Failed runs"
        fill="hsl(var(--chart-dkim))"
        radius={[3, 3, 0, 0]}
      />
    </>
  )
}
