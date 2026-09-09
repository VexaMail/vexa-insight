import type { ChartCardTitleProps } from './ChartCardTitleProps'

export function ChartCardTitle({ title }: Readonly<ChartCardTitleProps>) {
  return (
    <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
      {title}
    </h3>
  )
}
