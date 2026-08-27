import type { PageEyebrowProps } from './PageEyebrowProps'

export function PageEyebrow({ children }: Readonly<PageEyebrowProps>) {
  return (
    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
      {children}
    </p>
  )
}
