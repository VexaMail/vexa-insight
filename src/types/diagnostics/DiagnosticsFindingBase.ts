import type { DiagnosticsFinding } from './DiagnosticsFinding'

/** The fields of a finding that do not depend on its outcome. */
export type DiagnosticsFindingBase = Pick<
  DiagnosticsFinding,
  'id' | 'protocol' | 'check' | 'observed' | 'section'
>
