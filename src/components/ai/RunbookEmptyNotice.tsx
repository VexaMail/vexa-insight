export function RunbookEmptyNotice() {
  return (
    <div className="text-muted-foreground border-success/30 bg-success/5 rounded-lg border p-4 text-sm">
      No high-priority structural issues were detected in DNS or historical
      telemetry. If you still see delivery problems, use the AI analysis to look
      for subtler anomalies in organizations, forwarding, or partial alignment.
    </div>
  )
}
