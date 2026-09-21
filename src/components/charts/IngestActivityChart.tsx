'use client'

import type { IngestActivityChartProps } from '@/types/ingest'
import { ChartCardTitle } from './ChartCardTitle'
import { IngestActivityChartInner } from './IngestActivityChartInner'

/** Emails processed, reports stored and errors per day. */
export default function IngestActivityChart({
  data,
}: Readonly<IngestActivityChartProps>) {
  if (data.length === 0) {
    return (
      <div className="glass-card p-5">
        <ChartCardTitle title="Ingestion Activity" />
        <p className="text-muted-foreground py-8 text-center text-sm">
          No ingestion runs recorded in this period yet.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <ChartCardTitle title="Ingestion Activity" />
      <IngestActivityChartInner data={data} />
    </div>
  )
}
