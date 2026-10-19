import type { PageEyebrowProps } from './PageEyebrowProps'

export function PageEyebrow({ children }: Readonly<PageEyebrowProps>) {
  return (
    <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
      {children}
    </p>
  )
}
