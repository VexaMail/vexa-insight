'use client'

/** The fading fills under the pass and fail trend areas. */
export function TrendGradientDefs() {
  return (
    <defs>
      <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="0%"
          stopColor="hsl(var(--chart-pass))"
          stopOpacity={0.3}
        />
        <stop
          offset="100%"
          stopColor="hsl(var(--chart-pass))"
          stopOpacity={0}
        />
      </linearGradient>
      <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="0%"
          stopColor="hsl(var(--chart-fail))"
          stopOpacity={0.3}
        />
        <stop
          offset="100%"
          stopColor="hsl(var(--chart-fail))"
          stopOpacity={0}
        />
      </linearGradient>
    </defs>
  )
}
