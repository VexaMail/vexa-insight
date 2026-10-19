import type { DiagnosticsHeaderProps } from './DiagnosticsHeaderProps'

export type DiagnosticsHeaderControlsProps = Omit<
  DiagnosticsHeaderProps,
  'checkedAt'
>
