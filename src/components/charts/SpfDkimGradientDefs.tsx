'use client'

/** The four vertical gradients the SPF/DKIM bars are filled with. */
export function SpfDkimGradientDefs() {
  return (
    <defs>
      <linearGradient id="gradSpfPass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={1} />
        <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="gradSpfFail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity={0.9} />
        <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
      </linearGradient>
      <linearGradient id="gradDkimPass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={1} />
        <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="gradDkimFail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity={0.9} />
        <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
      </linearGradient>
    </defs>
  )
}
