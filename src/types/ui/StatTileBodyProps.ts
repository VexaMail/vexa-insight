import type { StatTileProps } from './StatTileProps'

export type StatTileBodyProps = Pick<
  StatTileProps,
  'label' | 'value' | 'hint' | 'tone' | 'icon'
>
