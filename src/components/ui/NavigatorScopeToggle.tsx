import type { NavigatorScopeToggleProps } from '@/types/ui'
import { navigatorScopeButtonClassName } from '@/utils/ui'

export function NavigatorScopeToggle({
  scopeMode,
  onFiltered,
  onAll,
}: Readonly<NavigatorScopeToggleProps>) {
  return (
    <div className="ml-2 flex items-center gap-2 border-l border-zinc-200 pl-4 dark:border-zinc-600">
      <span className="text-xs text-zinc-500">Scope:</span>
      <button
        type="button"
        onClick={onFiltered}
        className={navigatorScopeButtonClassName(scopeMode === 'filtered')}
      >
        Filtered
      </button>
      <button
        type="button"
        onClick={onAll}
        className={navigatorScopeButtonClassName(scopeMode === 'all')}
      >
        All
      </button>
    </div>
  )
}
