import type { ScopeMode } from './ScopeMode'

export type ListState = {
  itemsScope: string[]
  currentId: string | null
  scopeMode: ScopeMode
  setScope: (itemsScope: string[]) => void
  setCurrentId: (id: string | null) => void
  setScopeMode: (mode: ScopeMode) => void
  navigateContext: (direction: 'next' | 'prev') => string | null
}
