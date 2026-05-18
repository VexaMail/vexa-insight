'use client'

import type { SelfUpdateLogViewerProps } from './SelfUpdateLogViewerProps'

export default function SelfUpdateLogViewer({
  lines,
  running,
}: Readonly<SelfUpdateLogViewerProps>) {
  if (lines.length === 0) {
    return (
      <p className="text-muted-foreground text-xs">
        No update has been applied from this dashboard yet.
      </p>
    )
  }
  return (
    <div className="border-border/50 bg-secondary max-h-64 overflow-y-auto rounded-md border p-3 font-mono text-[11px] leading-relaxed">
      {lines.map((line, index) => (
        <div
          key={`${index}-${line.slice(0, 16)}`}
          className={
            line.startsWith('ERROR')
              ? 'text-destructive'
              : 'text-muted-foreground'
          }
        >
          {line}
        </div>
      ))}
      {running ? (
        <div className="text-primary mt-1 animate-pulse">▋ running…</div>
      ) : null}
    </div>
  )
}
