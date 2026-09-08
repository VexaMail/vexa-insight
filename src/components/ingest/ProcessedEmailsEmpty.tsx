import { Mail } from 'lucide-react'

/** Placeholder shown before any ingestion job has processed an email. */
export function ProcessedEmailsEmpty() {
  return (
    <div className="glass-card p-8 text-center">
      <Mail className="text-muted-foreground/30 mx-auto mb-2 h-8 w-8" />
      <p className="text-muted-foreground">
        No processed emails yet. Run an ingestion job to see results.
      </p>
    </div>
  )
}
