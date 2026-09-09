import type { UseNavigatorReturn } from './UseNavigatorReturn'

export type UseScopeModeHandlersReturn = Pick<
  UseNavigatorReturn,
  'handleSetScopeAll' | 'handleSetScopeFiltered'
>
