'use client'

export default function AiEmptyState() {
  return (
    <div className="border-border bg-secondary/40 rounded-lg border p-4">
      <p className="text-muted-foreground text-sm">
        The AI could not produce insights for this report because the source
        data is insufficient. This can happen if the report XML is incomplete or
        contains no authentication records.
      </p>
    </div>
  )
}
