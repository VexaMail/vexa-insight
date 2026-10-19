'use client'

import { useCallback, useState } from 'react'

import { diagnosticsSectionIds } from '@/constants/diagnostics'
import type {
  DiagnosticsSectionId,
  DiagnosticsSectionToggleProps,
  UseDiagnosticsSectionsReturn,
} from '@/types/diagnostics'
import { toggleSectionId } from '@/utils/diagnostics'

/**
 * Tracks which diagnostics detail sections are expanded. Each tab shows few
 * sections, so they start open and can be folded away.
 */
export function useDiagnosticsSections(): UseDiagnosticsSectionsReturn {
  const [openIds, setOpenIds] = useState<ReadonlySet<DiagnosticsSectionId>>(
    () => new Set(diagnosticsSectionIds),
  )

  const getSectionProps = useCallback(
    (id: DiagnosticsSectionId): DiagnosticsSectionToggleProps => ({
      open: openIds.has(id),
      onToggle: () => {
        setOpenIds((previous) => toggleSectionId(previous, id))
      },
    }),
    [openIds],
  )

  return { getSectionProps }
}
