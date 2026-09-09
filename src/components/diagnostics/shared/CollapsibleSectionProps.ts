import type {
  DiagnosticsSectionId,
  DiagnosticsSectionToggleProps,
} from '@/types/diagnostics'
import type { ReactNode } from 'react'
import type { SectionHeaderProps } from './SectionHeaderProps'

export type CollapsibleSectionProps = SectionHeaderProps &
  DiagnosticsSectionToggleProps & {
    id: DiagnosticsSectionId
    children: ReactNode
  }
