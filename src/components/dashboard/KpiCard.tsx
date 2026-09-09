import { Skeleton } from '@/components/ui'
import type { KpiCardProps } from './KpiCardProps'

export function KpiCard({ card, isLoading }: Readonly<KpiCardProps>) {
  return (
    <div className="glass-card-hover group relative overflow-hidden p-5">
      <div className="bg-primary/5 absolute top-0 right-0 h-24 w-24 -translate-x-6 -translate-y-6 rounded-full transition-transform duration-500 group-hover:scale-150" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {card.title}
          </p>
          {isLoading ? (
            <Skeleton className="h-9 w-24" />
          ) : (
            <p className="font-display text-foreground text-3xl font-bold tracking-tight">
              {card.value}
            </p>
          )}
        </div>
        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
          <card.icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
