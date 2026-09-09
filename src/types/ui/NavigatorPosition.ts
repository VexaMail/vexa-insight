import type { UseNavigatorReturn } from './UseNavigatorReturn'

export type NavigatorPosition = Pick<
  UseNavigatorReturn,
  'currentIndex' | 'hasNext' | 'hasPrev' | 'total'
>
