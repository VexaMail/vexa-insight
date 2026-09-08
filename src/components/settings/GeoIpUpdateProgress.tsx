import type { GeoIpUpdateProgressProps } from './GeoIpUpdateProgressProps'

/** Progress bar and ETA of a running MaxMind database download. */
export function GeoIpUpdateProgress({
  progress,
  etaText,
}: GeoIpUpdateProgressProps) {
  return (
    <div className="border-border/50 bg-background/50 flex flex-col gap-2 rounded-md border p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground font-medium">{progress.step}</span>
        <span className="text-muted-foreground">
          {Math.round(progress.progress)}%
        </span>
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${String(Math.max(2, progress.progress))}%` }}
        />
      </div>
      {etaText !== null && etaText !== '' && (
        <div className="text-muted-foreground text-right text-xs">
          {etaText}
        </div>
      )}
    </div>
  )
}
