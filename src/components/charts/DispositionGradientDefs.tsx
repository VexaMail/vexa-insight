'use client'

/** The pass and fail gradients the disposition bars are filled with. */
export function DispositionGradientDefs() {
  return (
    <defs>
      <linearGradient id="gradientPass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={1} />
        <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
      </linearGradient>
      <linearGradient id="gradientFail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity={1} />
        <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  )
}
