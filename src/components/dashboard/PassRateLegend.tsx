import type { PassRateLegendProps } from './PassRateLegendProps'

export function PassRateLegend({ rate }: Readonly<PassRateLegendProps>) {
  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        Global Pass Rate
      </p>
      <p className="text-muted-foreground text-sm">
        DMARC compliance across all domains
      </p>
      <div className="mt-3 flex gap-3">
        <div className="flex items-center gap-1.5">
          <div className="bg-success h-2 w-2 rounded-full" />
          <span className="text-muted-foreground text-xs">Pass {rate}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="bg-danger h-2 w-2 rounded-full" />
          <span className="text-muted-foreground text-xs">
            Fail {100 - rate}%
          </span>
        </div>
      </div>
    </div>
  )
}
