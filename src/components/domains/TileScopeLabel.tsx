import type { TileScopeLabelProps } from './TileScopeLabelProps'

/** The period a figure inside a tile covers, as a small caption above it. */
export function TileScopeLabel({ children }: Readonly<TileScopeLabelProps>) {
  return (
    <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
      {children}
    </p>
  )
}
