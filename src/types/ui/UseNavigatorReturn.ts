export type UseNavigatorReturn = {
  readonly currentIndex: number
  readonly hasNext: boolean
  readonly hasPrev: boolean
  readonly total: number
  readonly scopeMode: 'filtered' | 'all'
  readonly handleNext: () => void
  readonly handlePrev: () => void
  readonly handleSetScopeAll: () => void
  readonly handleSetScopeFiltered: () => void
}
