import { EmptyState } from '@/components/ui'
import type { ListEmptyStateProps } from './ListEmptyStateProps'

/** An empty settings list: loading, or what to add first. */
export function ListEmptyState({
  loading,
  loadingLabel,
  title,
  hint,
}: Readonly<ListEmptyStateProps>) {
  return (
    <EmptyState className="p-6">
      <p className="text-foreground font-medium">
        {loading ? loadingLabel : title}
      </p>
      {loading ? null : <p className="mt-1 text-xs">{hint}</p>}
    </EmptyState>
  )
}
