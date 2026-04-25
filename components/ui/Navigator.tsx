'use client'

import { useNavigator } from '@/hooks/ui'
import type { NavigatorProps } from '@/types/ui'
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react'
import { Button } from './button'

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
        <span className="text-zinc-600 dark:text-zinc-300">
          Viewing{' '}
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            {currentIndex + 1}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            {total}
          </span>
        </span>
        <div className="ml-2 flex items-center gap-2 border-l border-zinc-200 pl-4 dark:border-zinc-600">
          <span className="text-xs text-zinc-500">Scope:</span>
          <button
            type="button"
            onClick={handleSetScopeFiltered}
            className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
              scopeMode === 'filtered'
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            Filtered
          </button>
          <button
            type="button"
            onClick={handleSetScopeAll}
            className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
              scopeMode === 'all'
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            All
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={!hasPrev}
          className="h-8 gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!hasNext}
          className="h-8 gap-1"
        >
          Next <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
