import type { FindingsListProps } from './FindingsListProps'
import type { NextBestActionsProps } from './NextBestActionsProps'

export type FindingsTabProps = FindingsListProps &
  Pick<NextBestActionsProps, 'guides'>
