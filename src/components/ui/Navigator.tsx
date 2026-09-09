'use client'

import { useNavigator } from '@/hooks/ui'
import type { NavigatorProps } from '@/types/ui'
import { Layers } from 'lucide-react'
import { NavigatorArrows } from './NavigatorArrows'
import { NavigatorPosition } from './NavigatorPosition'
import { NavigatorScopeToggle } from './NavigatorScopeToggle'

export default function Navigator(props: NavigatorProps) {
  const {
    scopeMode,
    currentIndex,
    hasNext,
    hasPrev,
    total,
    handleNext,
    handlePrev,
    handleSetScopeAll,
    handleSetScopeFiltered,
  } = useNavigator(props)

  if (total === 0) return null

  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <Layers className="h-4 w-4 text-zinc-500" />
        <NavigatorPosition currentIndex={currentIndex} total={total} />
        <NavigatorScopeToggle
          scopeMode={scopeMode}
          onFiltered={handleSetScopeFiltered}
          onAll={handleSetScopeAll}
        />
      </div>
      <NavigatorArrows
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
