export function RunbookEmptyNotice() {
  return (
    <div className="text-muted-foreground rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm">
      No high-priority structural issues were detected in DNS or historical
      telemetry. If you still see delivery problems, use the AI analysis to look
      for subtler anomalies in organizations, forwarding, or partial alignment.
    </div>
  )
}
