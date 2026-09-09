import type { InsightCardSectionProps } from './InsightCardSectionProps'

export function InsightCardSection({
  title,
  children,
}: Readonly<InsightCardSectionProps>) {
  return (
    <div className="min-w-0 rounded-md border p-3">
      <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}
