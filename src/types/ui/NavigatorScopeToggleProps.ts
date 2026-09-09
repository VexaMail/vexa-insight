export type NavigatorScopeToggleProps = {
  readonly scopeMode: 'filtered' | 'all'
  readonly onFiltered: () => void
  readonly onAll: () => void
}
