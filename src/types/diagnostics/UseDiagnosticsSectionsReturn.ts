import type { DiagnosticsSectionId } from './DiagnosticsSectionId'
import type { DiagnosticsSectionToggleProps } from './DiagnosticsSectionToggleProps'

export type UseDiagnosticsSectionsReturn = {
  readonly getSectionProps: (
    id: DiagnosticsSectionId,
  ) => DiagnosticsSectionToggleProps
  readonly openSection: (id: DiagnosticsSectionId) => void
}
