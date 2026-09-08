/** Shown when no report has been ingested yet. */
export function ReportsTableEmpty() {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-muted-foreground">
        No reports yet. Upload a DMARC file or configure IMAP to ingest reports.
      </p>
    </div>
  )
}
